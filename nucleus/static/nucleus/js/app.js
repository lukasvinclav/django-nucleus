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
                backgroundColor: 'rgba(34, 41, 47, .02)',
                borderColor: getComputedStyle(document.documentElement).getPropertyValue('--color-grey-light'),
                barThickness: 0,
                borderWidth: 2,
                data: dataset.data,
                fill: true,
                label: false,
                pointBackgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--color-primary-base'),
                pointBorderColor: '#fff',
                pointBorderWidth: 4,
                pointHoverBackgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--color-primary-dark'),
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 4,
                pointHoverRadius: 5,
                pointRadius: 5
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
                scales: {
                    xAxes: [{
                        maxBarThickness: 1,
                        gridLines: {
                            borderDash: [10, 10],
                            color: 'rgba(34, 41, 47, .08)',
                            drawBorder: false,
                            zeroLineColor: getComputedStyle(document.documentElement).getPropertyValue('--color-grey-lighter'),
                            zeroLineWidth: 1
                        },
                        ticks: {
                            fontColor: getComputedStyle(document.documentElement).getPropertyValue('--color-grey-base'),
                            fontSize: 12,
                            fontFamily: getComputedStyle(document.documentElement).getPropertyValue('--font-family'),
                            fontStyle: '700',
                            padding: 10
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            borderDash: [10, 10],
                            color: 'rgba(34, 41, 47, .08)',
                            drawBorder: false,
                            zeroLineColor: getComputedStyle(document.documentElement).getPropertyValue('--color-grey-lighter'),
                            zeroLineWidth: 1
                        },
                        ticks: {
                            fontColor: getComputedStyle(document.documentElement).getPropertyValue('--color-grey-base'),
                            fontSize: 12,
                            fontFamily: getComputedStyle(document.documentElement).getPropertyValue('--font-family'),
                            fontStyle: '700',
                            padding: 20,
                            maxTicksLimit: 8,
                        }
                    }]
                }
            }
        });
    });
});