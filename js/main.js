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
    const heightPerc = '80%';
    // Drawing properties
    const width = 400;
    const xCenter = width/2;
    const yMargin = 5;
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
    const axisTLYOffset = 3.9;  // center vertically manually since 'dominant-baseline' is not implemented for mobile devices
    // Root svg tag
    const svg =
        SVG()
        .addTo(timelineContainer)
        .height(heightPerc)
        .addClass('o-green');
    svg.viewbox(0, 0, width, totalHeight);
    // Timeline axis line
    const axisLine =
        svg
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
            svg.
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
                svg
                .text(yearString)
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
