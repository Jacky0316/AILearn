// 聚合 4 个阶段的课程正文，key = 课程编号（如 '1.1.1'）
import s1 from './stage1.js'
import s2 from './stage2.js'
import s3 from './stage3.js'
import s4 from './stage4.js'

export default { ...s1, ...s2, ...s3, ...s4 }
