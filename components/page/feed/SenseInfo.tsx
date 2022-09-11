import React, { useEffect, useState } from 'react'
import tw from 'tailwind-styled-components';
import { useTheme } from '../../context/Theme';

const ProgressBar = require('progressbar.js');

const progressBarConfig = {
    strokeWidth: 10,
    easing: 'easeInOut',
    duration: 1400,
    color: '',
    trailColor: '',
    trailWidth: 5,
    svgStyle: {width: '100%', height: '100%'},
    text: {
        value: 'hi',
        alignToBottom: false,
        style: {
            position: 'absolute',
            left: '50%',
            top: '50%',
            padding: 0,
            margin: 0,
            transform: {
                prefix: true,
                value: 'translate(-50%, -50%)'
            }
        },
    },
}

interface PropType{
    id: number,
    sense: {
        name: string,
        value: number
    }
}  

const SenseInfo = (props: PropType) => {
    const [progressBar, setProgressBar] = useState(null)
    const {themeColorset} = useTheme();

    const containerId = `progressBar-${props.id}`;
    const progressValue = props.sense.value/5;
    progressBarConfig.color = themeColorset.pointColor;
    progressBarConfig.trailColor = themeColorset.bgColor;

    useEffect(()=>{
        progressBarConfig.text.value = props.sense.name;

        if(progressBar) progressBar.destroy();
        
        const bar = new ProgressBar.SemiCircle(`#${containerId}`, progressBarConfig)
        setProgressBar(bar);
        bar.animate(progressValue);

    }, [themeColorset])
    
    

    return (
        <SenseInfoContainer>
            <div id={containerId} style={{width: '80%'}}></div>
        </SenseInfoContainer>
    )
}

const SenseInfoContainer = tw.div`
    w-[100%] h-[100px]
    flex justify-center items-center
    font-bold text-sm text-center
`



export default SenseInfo