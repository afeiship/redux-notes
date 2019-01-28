// 创建action creator

export function setTitleAction(payload) {
    return {
        type: 'SET-TITLE',
        payload,
    }
}

// 设置state初始值
const initState = {
    title: '卖座网'
}

// reducer 纯函数
export default (state=initState,action)=> {
    switch (action.type) {
        case 'SET-TITLE':
        return {
            ...state,
            title: action.payload
        }
        default:
        return state;
    }
}