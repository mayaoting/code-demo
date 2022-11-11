
let arr = [
    {id: 1, name: '部门1', pid: 0},
    {id: 2, name: '部门2', pid: 1},
    {id: 3, name: '部门3', pid: 1},
    {id: 4, name: '部门4', pid: 3},
    {id: 5, name: '部门5', pid: 4},
]

[
    {
        "id": 1,
        "name": "部门1",
        "pid": 0,
        "children": [
            {
                "id": 2,
                "name": "部门2",
                "pid": 1,
                "children": []
            },
            {
                "id": 3,
                "name": "部门3",
                "pid": 1,
                "children": [
                    {
                        "id": 4,
                        "name": "部门4",
                        "pid": 3,
                        "children": [
                            {
                                "id": 5,
                                "name": "部门5",
                                "pid": 4,
                                "children": []
                            }
                        ]
                    }
                ]
            }
        ]
    }
]

[
    {
        "id": 0,
        "parentId": null,
        "name": "生物",
        "children": [
            {
                "id": 1,
                "parentId": 0,
                "name": "动物",
                "children": [
                    {
                        "id": 4,
                        "parentId": 1,
                        "name": "哺乳动物",
                        "children": [
                            {
                                "id": 8,
                                "parentId": 4,
                                "name": "大象"
                            },
                            {
                                "id": 9,
                                "parentId": 4,
                                "name": "海豚"
                            },
                            {
                                "id": 10,
                                "parentId": 4,
                                "name": "猩猩"
                            }
                        ]
                    },
                    {
                        "id": 5,
                        "parentId": 1,
                        "name": "卵生动物",
                        "children": [
                            {
                                "id": 11,
                                "parentId": 5,
                                "name": "蟒蛇"
                            },
                            {
                                "id": 12,
                                "parentId": 5,
                                "name": "麻雀"
                            }
                        ]
                    }
                ]
            },
            {
                "id": 2,
                "parentId": 0,
                "name": "植物",
                "children": [
                    {
                        "id": 6,
                        "parentId": 2,
                        "name": "种子植物"
                    },
                    {
                        "id": 7,
                        "parentId": 2,
                        "name": "蕨类植物"
                    }
                ]
            },
            {
                "id": 3,
                "parentId": 0,
                "name": "微生物"
            }
        ]
    }
]
