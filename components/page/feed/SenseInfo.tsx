import React, { useEffect, useState } from 'react'
import tw from 'tailwind-styled-components';
import { useTheme } from '../../context/Theme';

const ProgressBar = require('progressbar.js');

const senseMap = {
    'auditory': '청각',
    'visual': '시각',
    'vestibular': '전정감각',
    'tactile': '촉각',
    'proprioceptive': '고유수용성감각',
    'oral': '구강감각/미각/후각'
}

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
    name: string,
    value: number
}  

const SenseInfo = (props: PropType) => {
    const [progressBar, setProgressBar] = useState(null)
    const {themeColorset} = useTheme();

    const containerId = `progressBar-${props.name}`;
    const progressValue = props.value/100;
    progressBarConfig.color = themeColorset.pointColor;
    progressBarConfig.trailColor = themeColorset.bgColor;

    useEffect(()=>{
        progressBarConfig.text.value = senseMap[props.name] || '';

        if(progressBar) progressBar.destroy();
        
        const bar = new ProgressBar.SemiCircle(`#${containerId}`, progressBarConfig)
        setProgressBar(bar);
        bar.animate(progressValue);
        console.log('animate');
        

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