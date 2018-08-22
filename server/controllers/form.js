/*
 * @Author: allen.wong 
 * @Date: 2018-08-22 22:35:03 
 * @Last Modified by: allen.wong
 * @Last Modified time: 2018-08-22 22:59:37
 */

const models = require('../db/db.js')

const fn_addgroup = async ctx => {
  await models.Formdata.create({
    groups: ctx.request.body
  }).then(r => {
    ctx.rest({code: 1, msg: 'added', data: r.dataValues})
  })
}

const fn_getgroup = async ctx => {
  await models.Formdata.findOne({
    where: ctx.query
  }).then(r => {
    ctx.rest({code: 1, msg: 'query finished', data: r.dataValues})
  })
}

// 创建form组
module.exports = {
  'POST /api/addgroup': fn_addgroup,
  'GET /api/getgroup': fn_getgroup
}
