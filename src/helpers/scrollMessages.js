import { animateScroll } from 'react-scroll';


export const scrollBottom = ( idElement ) => {
    animateScroll.scrollToBottom({
        containerId: idElement,
        duration: 0,
    });
}


export const scrollBottomAnimated = ( idElement ) => {
    animateScroll.scrollToBottom({
        containerId: idElement,
        duration: 250,
    });
}