"use strict";

window.onload = () => {
    main();
}

/**
 * Main function for JS logic
 */
function main() {
    renderTimeline();
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
    const heightPerc = '85%';
    // Drawing properties
    const width = 400;
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
    // Root svg tag
    const svg =
        SVG()
        .addTo(timelineContainer)
        .height(heightPerc)
        .addClass('o-green');
    svg.viewbox(0, 0, width, totalHeight);
    // Timeline axis
    const axis = svg.group();
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
    // Render blobs
    renderTimelineBlob(  // UM
        svg,
        yMargin,
        xCenter,
        startYear,
        heightPerYear,
        axisLineStrokeWidth,
        'right',
        2017.75,
        'assets/svg/um_logo.svg',
        0.5, 
        'https://www.maastrichtuniversity.nl/'
    );
    renderTimelineBlob(  // UU
        svg,
        yMargin,
        xCenter,
        startYear,
        heightPerYear,
        axisLineStrokeWidth,
        'left',
        2020.75,
        'assets/svg/uu_logo.svg',
        0.75,
        'https://www.uu.se/en'
    );
    renderTimelineBlob(  // APG
        svg,
        yMargin,
        xCenter,
        startYear,
        heightPerYear,
        axisLineStrokeWidth,
        'left',
        2018.5,
        'assets/svg/apg_logo.svg',
        0.67,
        'https://apg.nl/en/'
    );
    renderTimelineBlob(  // Dedalo
        svg,
        yMargin,
        xCenter,
        startYear,
        heightPerYear,
        axisLineStrokeWidth,
        'right',
        2022.75,
        'assets/svg/dedalo_logo.svg',
        0.65,
        'https://dedalo.dev/'
    );
    renderTimelineBlob(  // MIB
        svg,
        yMargin,
        xCenter,
        startYear,
        heightPerYear,
        axisLineStrokeWidth,
        'left',
        2022.75,
        'assets/png/mib_coin.png',
        0.75,
        'https://monedaiberica.org/?lang=lg-eng'
    );
    renderTimelineBlob(  // EdLab
        svg,
        yMargin,
        xCenter,
        startYear,
        heightPerYear,
        axisLineStrokeWidth,
        'right',
        2018.75,
        'assets/jpg/edlab_logo.jpg',
        0.5,
        'https://edlab.nl/excellence/honoursplus/'
    );
}

/**
 * 
 * @param svg the SVG.js SVG object 
 * @param {number} yMargin y margin of the drawing
 * @param {number} xCenter the width center
 * @param {number} startYear the start year of the axis
 * @param {number} heightPerYear height per year
 * @param {number} xOffset the x-offset for the positioning
 * @param {'left' | 'right'} direction the direction of the blob
 * @param {number} year year of the blob
 * @param {string} imgSrc image source for the blob
 * @param {number} diameterMult diameter multiplier for resizing
 * @param {string} url web link for the blob
 */
function renderTimelineBlob(
    svg,
    yMargin,
    xCenter,
    startYear,
    heightPerYear,
    xOffset,
    direction,
    year,
    imgSrc,
    diameterMult,
    url
) {
    const distance = 110;
    const diameter = 70;
    const circXCenter = direction === 'right' ?
        xCenter + xOffset/2 + distance :
        xCenter - xOffset/2 - distance;
    const circYCenter = yMargin + (year - startYear) * heightPerYear;
    const blob = svg.group();
    const link = blob.link(url);
    link.target('_blank');
    const tmpCircle =
        link
        .circle(diameter)
        .fill('#FFFFFF')
        .center(circXCenter, circYCenter)
    const tmpImage = link.image(imgSrc, (event) => {
        tmpImage.size(diameter*diameterMult);
        tmpImage.move(circXCenter-tmpImage.width()/2, circYCenter-tmpImage.height()/2);
    });
}
