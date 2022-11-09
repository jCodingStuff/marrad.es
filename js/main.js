"use strict";

window.onload = () => {
    main();
}

/**
 * Main function for JS logic
 */
function main() {
    if (isMobile()) {
        handleHeaderMobile();
    }
    renderTimeline();
    handleSocialLinks();
}

/** Remove responsive stuff from header for mobile devices
 * If you scroll down on a mobile device, the URL bar appears,
 * changing the viewport, and things move around, get resized...
*/
function handleHeaderMobile() {
    for (const ele of document.getElementsByClassName('header-column')) {
        const height = ele.offsetHeight;
        ele.style.height = `${height}px`;
        ele.classList.remove('span-vh');
    }
}

/**
 * Render the timeline
 */
function renderTimeline() {
    /**
     * Div containing the timeline svg
     * @type {Element}
     */
    const timelineContainer = document.getElementById('timeline-container');
    const timelineContainerHeight = timelineContainer.offsetHeight;
    const timelineContainerWidth = timelineContainer.offsetWidth;
    const heightPerc = 85;
    const realHeight = timelineContainerHeight*heightPerc/100;
    // Let mobile devices have a fixed size for the svg (otherwise makes scrolling awful)
    const heightString = isMobile() ? realHeight.toFixed(3) + 'px' : `${heightPerc}%`;
    // Drawing properties
    const width = 335;
    const xCenter = width/2;
    const yMargin = 10;
    // Axis line
    const axisLineStrokeWidth = 2;
    const heightPerYear = 100;
    const startYear = 2017.5;
    const endYear = 2023;
    const years = endYear - startYear;
    const totalHeight = years * heightPerYear + 2 * yMargin;
    // Axis ticks
    const axisTickWidth = 8;
    const axisMajorTickWidth = 16;
    const axisTickStrokeWidth = 2.5;
    // Axis tick labels
    const axisTLSize = 12;
    const axisTLXOffset = 5;
    const axisTLYOffset = 4.15;  // center vertically manually since 'dominant-baseline' is not implemented for mobile devices
    // Root svg tag TODO: make it accesible with ARIA stuff
    const svg =
        SVG()
        .addTo(timelineContainer)
        .height(heightString);
        // .addClass('o-green');
    svg.viewbox(0, 0, width, totalHeight);
    // Timeline axis
    const axis = svg.group();
    renderTimelineAxis(
        axis,
        xCenter,
        yMargin,
        totalHeight,
        axisLineStrokeWidth,
        startYear,
        endYear,
        heightPerYear,
        axisMajorTickWidth,
        axisTickWidth,
        axisTickStrokeWidth,
        axisTLSize,
        axisTLXOffset,
        axisTLYOffset
    );
    // Render blobs
    const xOffset = axisMajorTickWidth/2 + 5;
    let distance = 115;
    const realWidth = realHeight*width/totalHeight;
    const widthMargin = 20;
    // Reduce distance if we go over the width of the screen in a mobile device
    if (realWidth + widthMargin > timelineContainerWidth) {
        distance -= 12;
    }
    renderTimelineBlob(  // UM
        svg,
        'um',
        yMargin,
        xCenter,
        startYear,
        heightPerYear,
        xOffset,
        distance,
        'right',
        2017.75,
        'assets/svg/um_logo.svg',
        0.5, 
        'https://www.maastrichtuniversity.nl/education/bachelor/data-science-and-artificial-intelligence'
    );
    renderTimelineBlob(  // InterUM
        svg,
        'interum',
        yMargin,
        xCenter,
        startYear,
        heightPerYear,
        xOffset,
        distance,
        'left',
        2017.75,
        'assets/png/interum_logo.png',
        0.75, 
        'https://www.maastrichtuniversity.nl/maastricht-university-ambassadors-team'
    );
    renderTimelineBlob(  // APG
        svg,
        'apg',
        yMargin,
        xCenter,
        startYear,
        heightPerYear,
        xOffset,
        distance,
        'left',
        2018.6,
        'assets/svg/apg_logo.svg',
        0.67,
        'https://apg.nl/en/about-apg/groeifabriek/'
    );
    renderTimelineBlob(  // EdLab
        svg,
        'edlab',
        yMargin,
        xCenter,
        startYear,
        heightPerYear,
        xOffset,
        distance,
        'right',
        2018.75,
        'assets/jpg/edlab_logo.jpg',
        0.5,
        'https://edlab.nl/excellence/honoursplus/'
    );
    renderTimelineBlob(  // UU
        svg,
        'uu',
        yMargin,
        xCenter,
        startYear,
        heightPerYear,
        xOffset,
        distance,
        'left',
        2020.75,
        'assets/svg/uu_logo.svg',
        0.75,
        'http://www.it.uu.se/education/master_programmes/computational_science'
    );
    renderTimelineBlob(  // VSP lab
        svg,
        'vsp',
        yMargin,
        xCenter,
        startYear,
        heightPerYear,
        xOffset,
        distance,
        'right',
        2021.75,
        'assets/svg/water_molecule.svg',
        0.75,
        'https://folding.bmc.uu.se/'
    );
    renderTimelineBlob(  // Dedalo
        svg,
        'dedalo',
        yMargin,
        xCenter,
        startYear,
        heightPerYear,
        xOffset,
        distance,
        'right',
        2022.60,
        'assets/svg/dedalo_logo.svg',
        0.65,
        'https://dedalo.dev/'
    );
    renderTimelineBlob(  // MIB
        svg,
        'mib',
        yMargin,
        xCenter,
        startYear,
        heightPerYear,
        xOffset,
        distance,
        'left',
        2022.75,
        'assets/png/mib_coin.png',
        0.75,
        'https://monedaiberica.org/?lang=lg-eng'
    );
}

/**
 * Render the timeline axis
 * @param axis the axis SVG group
 * @param {number} xCenter the x-center of the svg
 * @param {number} yMargin the y-margin for the y-axis
 * @param {number} totalHeight the total height of the svg
 * @param {number} axisLineStrokeWidth the stroke width of the axis line
 * @param {number} startYear the start year of the plot
 * @param {number} endYear the end year of the plot
 * @param {number} heightPerYear height of a year
 * @param {number} axisMajorTickWidth width of major (yearly) ticks
 * @param {number} axisTickWidth width of minor (quarterly) ticks
 * @param {number} axisTickStrokeWidth stroke width of ticks
 * @param {number} axisTLSize size of tick labels
 * @param {number} axisTLXOffset x-offset for the tick labels
 * @param {number} axisTLYOffset y-offset for the tick labels
 */
function renderTimelineAxis(
    axis,
    xCenter,
    yMargin,
    totalHeight,
    axisLineStrokeWidth,
    startYear,
    endYear,
    heightPerYear,
    axisMajorTickWidth,
    axisTickWidth,
    axisTickStrokeWidth,
    axisTLSize,
    axisTLXOffset,
    axisTLYOffset
) {
    // Timeline axis line
    const axisLine =
        axis
        .line(xCenter, yMargin, xCenter, totalHeight - yMargin)
    axisLine.stroke({
        width: axisLineStrokeWidth,
        color: '#FFFFFF',
    });
    // Timeline axis ticks and labels
    for (let year = startYear; year <= endYear; year += 0.25) {
        const yOffset = (year - startYear) * heightPerYear;
        // FIXME: floating arithmetic, dangerous!
        const tickWidth = Number.isInteger(year) ? axisMajorTickWidth : axisTickWidth;
        const tmpLine =
            axis.
            line(
                xCenter - tickWidth/2, yMargin + yOffset,
                xCenter + tickWidth/2, yMargin + yOffset
            );
        tmpLine.stroke({
            width:  axisTickStrokeWidth,
            color: '#FFFFFF',
        });
        // Year label
        if (Number.isInteger(year)) {
            const yearRounded = Math.floor(year);
            const evenYear = yearRounded % 2 === 0;
            const yearString = String(yearRounded);
            const tmpText =
                axis
                .plain(yearString)
                .attr({
                    'text-anchor': evenYear ? 'end' : 'start',
                    // 'dominant-baseline': 'middle', NOT IMPLEMENTED IN MOBILE DEVICES
                })
                .font({
                    family: 'Roboto',
                    fill: '#FFFFFF',
                    size: axisTLSize,
                });
            const xPos = evenYear ?
                xCenter - axisMajorTickWidth/2 - axisTLXOffset :
                xCenter + axisMajorTickWidth/2 + axisTLXOffset;
            tmpText.amove(xPos, yMargin + yOffset + axisTLYOffset);
        }
    }
}

/**
 * 
 * @param svg the SVG.js SVG object 
 * @param {number | string} id the id of the blob
 * @param {number} yMargin y margin of the drawing
 * @param {number} xCenter the width center
 * @param {number} startYear the start year of the axis
 * @param {number} heightPerYear height per year
 * @param {number} xOffset the x-offset for the positioning
 * @param {number} distance the x-distance of the circle center
 * @param {'left' | 'right'} direction the direction of the blob
 * @param {number} year year of the blob
 * @param {string} imgSrc image source for the blob
 * @param {number} diameterMult diameter multiplier for resizing
 * @param {string} url web link for the blob
 */
function renderTimelineBlob(
    svg,
    id,
    yMargin,
    xCenter,
    startYear,
    heightPerYear,
    xOffset,
    distance,
    direction,
    year,
    imgSrc,
    diameterMult,
    url
) {
    // Properties
    const diameter = 70;
    const circXCenter = direction === 'right' ?
        xCenter + xOffset + distance :
        xCenter - xOffset - distance;
    const circYCenter = yMargin + (year - startYear) * heightPerYear;
    const arrowPointerWidth = 16;
    const arrowPointerHeight = 12;
    const arrowLineStrokeWidth = 3.5;
    const arrowPointerStartX = direction === 'right' ?
        xCenter + xOffset : xCenter - xOffset;
    const arrowPointerEndX = direction === 'right' ?
        arrowPointerStartX + arrowPointerWidth :
        arrowPointerStartX - arrowPointerWidth;
    const blobImageID = `blob-img-${id}`;
    const blobCircleID = `blob-circ-${id}`;
    const default_opacity = 0.85;
    const default_translation = direction === 'right' ? 4 : -4;
    // Group for all the blob
    const blob = svg.group();
    // The arrow
    const arrow = blob.group();
    const arrowLine =
        arrow.line(
            direction === 'right' ?
                circXCenter - distance + arrowPointerWidth :
                circXCenter + distance - arrowPointerWidth,
            circYCenter,
            circXCenter,
            circYCenter
        );
    arrowLine.stroke({
        width: arrowLineStrokeWidth,
        color: '#FFFFFF',
    });
    const arrowPointer =
        arrow
        .polygon(
            `${arrowPointerStartX},${circYCenter} ` +
            `${arrowPointerEndX},${circYCenter+arrowPointerHeight/2} ` +
            `${arrowPointerEndX},${circYCenter-arrowPointerHeight/2}`
        )
        .fill('#FFFFFF');
    // The circle and picture
    const link = blob.link(url);
    link.target('_blank');
    const tmpCircle =
        link
        .circle(diameter)
        .attr({
            'id': blobCircleID,
        })
        .fill('#FFFFFF')
        .center(circXCenter, circYCenter);
    const tmpImage = link.image(imgSrc, (event) => {
        tmpImage.size(diameter*diameterMult);
        tmpImage.move(circXCenter-tmpImage.width()/2, circYCenter-tmpImage.height()/2);
    }).attr({'id': blobImageID});;
    // Opacity (a LOT of hacking here to prevent events firing twice)
    const blobAnim = (ele, o, tx) => {
        ele
        .animate(250)
        .opacity(o)
        .transform({
            translateX:  tx,
        });
    };
    blob.opacity(default_opacity);
    addEventsToSVGGroup(
        [tmpCircle, tmpImage],
        {
            mouseover: () => {blobAnim(blob, 1, default_translation)},
            mouseout: () => {blobAnim(blob, default_opacity, 0)},
        }
    );
}

/**
 * Add events to an SVG group with overlapping elements
 * so that they do not trigger multiple times
 * 
 * All elements must have a unique ID
 * 
 * Supported events are `mouseover`, `mouseout`
 * @param {Array} elements the svg elements inside the group
 * @param {{mouseover?: () => void, mouseout?: () => void}} events 
 */
function addEventsToSVGGroup(elements, events) {
    /**
     * Array of ids of the elements
     * @type {string[]}
     */
    const ids = elements.map((ele) => ele.attr('id'));
    // mouseover
    if (events.mouseover) {
        for (const ele of elements) {
            ele.mouseover((event) => {
                // Block event if mouse comes from any
                // other element in the group
                if (ids.includes(event.relatedTarget.id)) {
                    return;
                }
                // Do the event
                events.mouseover();
            });
        }
    }
    // mouseout
    if (events.mouseout) {
        for (const ele of elements) {
            ele.mouseout((event) => {
                // Block event if mouse goes to any
                // other element in the group
                if (ids.includes(event.explicitOriginalTarget.id)) {
                    return;
                }
                // Do the event
                events.mouseout();
            });
        }
    }
}

/**
 * Check if we are in a mobile device
 * @returns `true` if we are in a mobile device, `false` otherwise
 */
function isMobile() {
    return (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        || isIpadOS()
    );
}

/**
 * Check if we are in ipadOS
 * @returns `true` if we are in ipadOS, `false` otherwise
 */
function isIpadOS() {
    return navigator.maxTouchPoints &&
        navigator.maxTouchPoints > 2 &&
        /MacIntel/.test(navigator.platform);
}

/**
 * React to click on social link
 */
function handleSocialLinks() {
    const links = {
        'github': 'https://github.com/jCodingStuff',
        'linkedin': 'https://www.linkedin.com/in/marrades/',
        'youtube': 'https://www.youtube.com/@jCodingStuff',
    };
    for (const [name, url] of Object.entries(links)) {
        document.getElementById(`${name}-social-link`).addEventListener('click', () => {
            window.open(url);
        })
    }
}
