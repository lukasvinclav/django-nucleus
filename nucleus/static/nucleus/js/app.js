document.addEventListener("DOMContentLoaded", function(event) {
    // Sidebar dropdowns
    document.querySelectorAll('.sidebar .app.has-submenu').forEach(function(item) {
        item.querySelector('a').addEventListener('click', function(e) {
            e.preventDefault();

            document.querySelectorAll('.sidebar .app').forEach(function(item) {
                item.classList.remove('active');
            });

            item.classList.toggle('active');
        });
    });

    // Stat item charts
    var charts = document.querySelectorAll('.stat-item-chart');
    charts.forEach(function(chart) {
        var ctx = chart.getContext('2d');
        data = JSON.parse(chart.getAttribute('data-series'));

        var datasets = data.datasets.map(function(dataset) {
            return {
                backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--color-grey-lightest'),
                borderColor: getComputedStyle(document.documentElement).getPropertyValue('--color-grey-lighter'),
                borderWidth: 1,
                data: dataset.data,       
                lineTension: 0,   
                pointRadius: 0
            }
        });

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: datasets
            },
            options: {
                plugins: {
                    datalabels: {
                        display: false
                    }
                },
                maintainAspectRatio: true,
                legend: {
                    display: false
                },
                layout: {
                    padding: {
                        left: 0,
                        top: 30
                    }
                },           
                scales: {
                    xAxes: [{
                        display: false                        
                    }],
                    yAxes: [{
                        display: false
                    }]
                }
            }
        });        
    });

    // Charts
    var charts = document.querySelectorAll('.chart-canvas');

    charts.forEach(function(chart) {
        var ctx = chart.getContext('2d');
        data = JSON.parse(chart.getAttribute('data-series'));

        var datasets = data.datasets.map(function(dataset) {
            return {
                backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--color-green-base'),
                borderColor: getComputedStyle(document.documentElement).getPropertyValue('--color-green-light'),
                barThickness: 0,
                borderWidth: 2,
                data: dataset.data,
                fill: false,
                label: false,
                lineTension: 0,
                pointBackgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--color-green-base'),
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverBackgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--color-green-base'),
                pointHoverBorderColor: '#fff',
                pointRadius: 4
            }
        });

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: datasets
            },
            options: {
                plugins: {
                    datalabels: {
                        display: false
                    }
                },
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                layout: {
                    padding: {
                        left: 0,
                        top: 30
                    }
                },
                tooltips: {
                    callbacks: {
                        title: false
                    }
                },
                scales: {
                    xAxes: [{
                        maxBarThickness: 1,
                        gridLines: {
                            borderDash: [8, 8],
                            color: getComputedStyle(document.documentElement).getPropertyValue('--color-grey-lighter'),
                            drawBorder: false,
                            zeroLineColor: getComputedStyle(document.documentElement).getPropertyValue('--color-grey-lighter'),
                            zeroLineWidth: 1
                        },
                        ticks: {
                            fontColor: getComputedStyle(document.documentElement).getPropertyValue('--color-grey-dark'),
                            fontSize: 11,
                            fontFamily: getComputedStyle(document.documentElement).getPropertyValue('--font-family'),
                            fontWeight: 700,
                            padding: 10
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            borderDash: [8, 8],
                            color: getComputedStyle(document.documentElement).getPropertyValue('--color-grey-lighter'),
                            drawBorder: false,
                            zeroLineColor: getComputedStyle(document.documentElement).getPropertyValue('--color-grey-lighter'),
                            zeroLineWidth: 1
                        },
                        ticks: {
                            fontColor: getComputedStyle(document.documentElement).getPropertyValue('--color-grey-dark'),
                            fontSize: 11,
                            fontFamily: getComputedStyle(document.documentElement).getPropertyValue('--font-family'),
                            fontWeight: 700,
                            padding: 20
                        }
                    }]
                }
            }
        });
    });
});