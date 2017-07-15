/* ExportView
 * ================
 *
 * This component is responsible for getting the chart into a nice state for phantomjs
 * to take a PNG screenshot, and serializing the SVG for export.
 *
 * @project Our World In Data
 * @author  Jaiden Mispy
 * @created 2016-08-09
 */

import * as _ from 'lodash'
import * as $ from 'jquery'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as ReactDOMServer from 'react-dom/server'
import * as d3 from 'd3'
import Bounds from './Bounds'
import ChartView from './ChartView'
import {when} from 'mobx'
import ChartConfig, {ChartConfigProps} from './ChartConfig'

export default class ExportView {
    static bootstrap({ jsonConfig, containerNode }: { jsonConfig: ChartConfigProps, containerNode: HTMLElement }) {
        const targetWidth = App.IDEAL_WIDTH, targetHeight = App.IDEAL_HEIGHT;
        const targetBounds = new Bounds(0, 0, targetWidth, targetHeight)
        let chartView: ChartView

        const chart = new ChartConfig(jsonConfig)

        when(
            () => chart.vardata.isReady,
            () => {
                const html = ReactDOMServer.renderToStaticMarkup(<ChartView
                    chart={chart}
                    isExport={true}
                    bounds={targetBounds}/>)

                $("link").remove()
                $("body").append(html)
                console.log((document.getElementById("chart") as HTMLDivElement).innerHTML)
            }
        )

    }
}
