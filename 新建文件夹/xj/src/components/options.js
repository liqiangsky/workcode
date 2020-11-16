module.exports = {
    line: {
        xAxis: {
            crosshair: {
                width: 1,
                color: "red"
            },
            categories: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
            labels: {
                format: '{value}月'
            }
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: [{
            name: "折线",
            type: "line",
            data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: '柱形1',
            type: "column",
            data: [5, 12, 10, 5, 14, 21, 9, 18, 4, 5, 6, 19]
        }, {
            name: '柱形2',
            type: "column",
            data: [-5, -12, -10, -5, -14, -21, -9, -18, -4, -5, -6, -19]
        }]
    }
}