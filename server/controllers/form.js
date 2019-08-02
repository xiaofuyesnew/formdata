/*
 * @Author: allen.wong 
 * @Date: 2018-08-22 22:35:03 
 * @Last Modified by: allen.wong
 * @Last Modified time: 2018-09-05 16:55:56
 */

const models = require('../db/db.js')

/**
 * 
 * 增加数据组，传入一个数据对象,为整个数据的结构
 */
const fn_addgroup = async ctx => {
  await models.Formdata.create({
    groups: ctx.request.body
  }).then(r => {
    ctx.rest({code: 1, msg: 'added', data: r})
  })
}

// 查询单条数据，在修改数据结构时使用
const fn_getgroup = async ctx => {
  await models.Formdata.findOne({
    where: ctx.query
  }).then(r => {
    ctx.rest({code: 1, msg: 'query finished', data: r})
  })
}

// 查询数据组列表，管理端使用
const fn_getgrouplist = async ctx => {
  await models.Formdata.findAll().then(r => {
    ctx.rest({code: 1, msg: 'query finished', data: r})
  })
}

// 删除数据组，可进行多选删除
const fn_delgrounp = async ctx => {
  let con = []
  // console.log()
  if (ctx.query.id[0] === '[') {
    con = JSON.parse(ctx.query.id)
  } else {
    con.push(ctx.query.id)
  }
  await models.Formdata.findAll({
    where: {
      id: {
        $in: con
      }
    }
  }).then(async r => {
    for (let item of r) {
      await item.destroy()
    }
    ctx.rest({code: 1, msg: 'deleted'})
  })
}

// 更改数据，替换整个数据组
const fn_updgroup = async ctx => {
  await models.Formdata.update({
    groups: JSON.parse(ctx.request.body.groups)
  }, {
    where: {
      id: ctx.request.body.id
    },
    fields: ['groups']
  })
}

module.exports = {
  'POST /api/addgroup': fn_addgroup,
  'GET /api/getgroup': fn_getgroup,
  'GET /api/getgrouplist': fn_getgrouplist,
  'GET /api/delgroup': fn_delgrounp,
  'POST /api/updgroup': fn_updgroup
}
