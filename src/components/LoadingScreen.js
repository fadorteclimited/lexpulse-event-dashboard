import React from "react";

const LoadingScreen = () => {

    return (<div className={'h-100 w-100 bg-dark'}>
        <div className={'loader-container verticalCenter bg-dark'}>
            <div className={'spinner'}/>
        </div>
    </div> )
}

export default LoadingScreen