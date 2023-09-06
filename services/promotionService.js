'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.promotionService = void 0
const http_status_1 = __importDefault(require('http-status'))
const mongoose_1 = __importDefault(require('mongoose'))
const errorHandlers_1 = require('../middlewares/errorHandlers')
const productModel_1 = require('../models/productModel')
const promotionModel_1 = require('../models/promotionModel')
const utils_1 = require('../utils/utils')
exports.promotionService = {
  /**
   * get promotions with id
   * @param {string} promotionId
   * @returns onPromotion
   */
  getPromotionWithId: async (promotionId) => {
    const currentTime = new Date()
    const onPromotion = await promotionModel_1.Promotion.aggregate([
      {
        $lookup: {
          from: 'promotiontimeslots',
          localField: 'time_slot',
          foreignField: '_id',
          as: 'timeSlot'
        }
      },
      {
        $unwind: '$timeSlot'
      },
      {
        $match: {
          $or: [
            { 'timeSlot.time_start': { $gte: currentTime } },
            {
              $and: [{ 'timeSlot.time_start': { $lte: currentTime } }, { 'timeSlot.time_end': { $gte: currentTime } }]
            }
          ],
          'timeSlot._id': new mongoose_1.default.Types.ObjectId(promotionId)
        }
      },
      {
        $addFields: {
          price: {
            $cond: {
              if: {
                $and: [{ $gte: [currentTime, '$timeSlot.time_start'] }, { $lte: [currentTime, '$timeSlot.time_end'] }]
              },
              then: '$price',
              else: {
                $multiply: ['$price', utils_1.generalPricePromotion]
              }
            }
          }
        }
      },
      {
        $lookup: {
          from: 'products',
          localField: 'product',
          foreignField: '_id',
          as: 'product'
        }
      },
      {
        $unwind: '$product'
      },
      {
        $project: {
          time_slot: 0
        }
      }
    ])
    return onPromotion
  },
  /**
   * get all promotions
   * @returns AllPromotions
   */
  getAllPromotion: async () => {
    const AllPromotions = await promotionModel_1.Promotion.find().populate('product')
    return AllPromotions
  },
  /**
   * Get timeslots
   * @returns timeSlots
   */
  getAllTimeSlots: async () => {
    const timeSlots = await promotionModel_1.PromotionTimeSlots.find().sort({ time_end: 1 }).limit(5)
    return timeSlots
  },
  /**
   * Create Promotion
   * @param {IPromotion} promotionBody
   * @returns NewPromotion
   */
  createPromotions: async (promotionArray) => {
    const newPromotions = []
    for (const promotionBody of promotionArray) {
      const promotion = await promotionModel_1.Promotion.findOne({
        $and: [{ time_slot: promotionBody.time_slot }, { product: promotionBody.product }]
      })
      if (promotion) {
        throw new errorHandlers_1.ApiError(
          'Sản phẩm trong khung giờ bị trùng',
          http_status_1.default.UNPROCESSABLE_ENTITY,
          ''
        )
      }
      const newPromotion = await promotionModel_1.Promotion.create(promotionBody)
      newPromotions.push(newPromotion)
      await productModel_1.Product.findByIdAndUpdate(
        promotionBody.product,
        { promotion: newPromotion._id },
        { new: true }
      )
    }
    return newPromotions
  }
}
