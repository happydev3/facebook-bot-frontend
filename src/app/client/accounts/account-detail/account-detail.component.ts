import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
    selector   : 'app-account-detail',
    templateUrl: './account-detail.component.html',
    styleUrls  : ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit, OnDestroy
{
   
    widget1SelectedYear = '2016';
    widget1:any;  

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _formBuilder: FormBuilder
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this._registerCustomChartJSPlugin();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
       this.widget1 = {
        chartType: 'line',
        datasets : {
            '2016': [
                {
                    label: 'Sales',
                    data : [1.9, 3, 3.4, 2.2, 2.9, 3.9, 2.5, 3.8, 4.1, 3.8, 3.2, 2.9],
                    fill : 'start'

                }
            ],
            '2017': [
                {
                    label: 'Sales',
                    data : [2.2, 2.9, 3.9, 2.5, 3.8, 3.2, 2.9, 1.9, 3, 3.4, 4.1, 3.8],
                    fill : 'start'

                }
            ],
            '2018': [
                {
                    label: 'Sales',
                    data : [3.9, 2.5, 3.8, 4.1, 1.9, 3, 3.8, 3.2, 2.9, 3.4, 2.2, 2.9],
                    fill : 'start'

                }
            ]

        },
        labels   : ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        colors   : [
            {
                borderColor              : '#42a5f5',
                backgroundColor          : '#42a5f5',
                pointBackgroundColor     : '#1e88e5',
                pointHoverBackgroundColor: '#1e88e5',
                pointBorderColor         : '#ffffff',
                pointHoverBorderColor    : '#ffffff'
            }
        ],
        options  : {
            spanGaps           : false,
            legend             : {
                display: false
            },
            maintainAspectRatio: false,
            layout             : {
                padding: {
                    top  : 32,
                    left : 32,
                    right: 32
                }
            },
            elements           : {
                point: {
                    radius          : 4,
                    borderWidth     : 2,
                    hoverRadius     : 4,
                    hoverBorderWidth: 2
                },
                line : {
                    tension: 0
                }
            },
            scales             : {
                xAxes: [
                    {
                        gridLines: {
                            display       : false,
                            drawBorder    : false,
                            tickMarkLength: 18
                        },
                        ticks    : {
                            fontColor: '#ffffff'
                        }
                    }
                ],
                yAxes: [
                    {
                        display: false,
                        ticks  : {
                            min     : 1.5,
                            max     : 5,
                            stepSize: 0.5
                        }
                    }
                ]
            },
            plugins            : {
                filler      : {
                    propagate: false
                },
                xLabelsOnTop: {
                    active: true
                }
            }
        }
    }

        
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    private _registerCustomChartJSPlugin(): void
    {
        (<any>window).Chart.plugins.register({
            afterDatasetsDraw: function (chart, easing): any {
                // Only activate the plugin if it's made available
                // in the options
                if (
                    !chart.options.plugins.xLabelsOnTop ||
                    (chart.options.plugins.xLabelsOnTop && chart.options.plugins.xLabelsOnTop.active === false)
                )
                {
                    return;
                }

                // To only draw at the end of animation, check for easing === 1
                const ctx = chart.ctx;

                chart.data.datasets.forEach(function (dataset, i): any {
                    const meta = chart.getDatasetMeta(i);
                    if ( !meta.hidden )
                    {
                        meta.data.forEach(function (element, index): any {

                            // Draw the text in black, with the specified font
                            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                            const fontSize = 13;
                            const fontStyle = 'normal';
                            const fontFamily = 'Roboto, Helvetica Neue, Arial';
                            ctx.font = (<any>window).Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

                            // Just naively convert to string for now
                            const dataString = dataset.data[index].toString() + 'k';

                            // Make sure alignment settings are correct
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            const padding = 15;
                            const startY = 24;
                            const position = element.tooltipPosition();
                            ctx.fillText(dataString, position.x, startY);

                            ctx.save();

                            ctx.beginPath();
                            ctx.setLineDash([5, 3]);
                            ctx.moveTo(position.x, startY + padding);
                            ctx.lineTo(position.x, position.y - padding);
                            ctx.strokeStyle = 'rgba(255,255,255,0.12)';
                            ctx.stroke();

                            ctx.restore();
                        });
                    }
                });
            }
        });
    }

    // -----------------------------------------------------------------------------------------------------
   
}
