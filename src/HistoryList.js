import React from 'react'
import History from './History'

export default function HistoryList({history}) {
    const histories=JSON.parse(history)
    if(histories){
        return (
        
            JSON.parse(history).map(element => {
                return <History key={element.id} history={element} />
                
            })
            
        )
    }else{
        return null 
    }
    
}
