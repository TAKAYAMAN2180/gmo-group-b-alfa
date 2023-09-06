import { dataSource } from "../../../../data-source"
import { User } from "../../../../entity/User"

import type { NextApiRequest, NextApiResponse } from 'next' // <-追加
export default (req: NextApiRequest, res: NextApiResponse) => {
    const userRepository = dataSource.getRepository(User)
    console.log(userRepository)
    // const user = await userRepository.findOneBy({
    //     id: req.query.id,
    // })
    res.status(200).json({ name: 1 })
}