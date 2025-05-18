// Initialize Google Charts
google.load('visualization', '1', {packages:['corechart']});

$(document).ready(function() {
  // Initialize tables
  initializeTables();
  
  // Draw initial charts
  google.setOnLoadCallback(drawCharts);
  
  // Initialize event handlers
  initializeEventHandlers();
});

function initializeTables() {
  // Add click handlers for tooth sections
  $('.tooth-section').click(function() {
    // Handle tooth section clicks
    updateToothSection($(this));
  });
  
  // Add handlers for measurements
  $('input.measurement').change(function() {
    // Update measurements and redraw charts
    updateMeasurements($(this));
    drawCharts();
  });
}

function drawCharts() {
  // Draw charts for each tooth
  const teeth = ['18', '17', '16', '15', '14', '13', '12', '11',
                 '21', '22', '23', '24', '25', '26', '27', '28',
                 '48', '47', '46', '45', '44', '43', '42', '41',
                 '31', '32', '33', '34', '35', '36', '37', '38'];
  
  teeth.forEach(tooth => {
    drawToothChart(tooth);
  });
}

function drawToothChart(toothId) {
  const data = new google.visualization.DataTable();
  data.addColumn('string', 'Position');
  data.addColumn('number', 'Depth');
  
  // Get measurements for this tooth
  const measurements = getMeasurements(toothId);
  
  data.addRows([
    ['Vestibular', measurements.vestibular],
    ['Medial', measurements.medial],
    ['Lingual', measurements.lingual]
  ]);
  
  const options = {
    title: `Tooth ${toothId}`,
    vAxis: {minValue: 0, maxValue: 10},
    legend: 'none'
  };
  
  const chart = new google.visualization.LineChart(
    document.getElementById(`visualization${toothId}a`)
  );
  
  chart.draw(data, options);
}

function getMeasurements(toothId) {
  return {
    vestibular: parseFloat($(`#s${toothId}-a`).val()) || 0,
    medial: parseFloat($(`#s${toothId}-b`).val()) || 0,
    lingual: parseFloat($(`#s${toothId}-c`).val()) || 0
  };
}

function updateToothSection(section) {
  // Toggle tooth section state
  section.toggleClass('selected');
  
  // Update visualization
  const toothId = section.attr('id').split('-')[0];
  drawToothChart(toothId);
}

function initializeEventHandlers() {
  // Add handlers for implants
  $('.implant-toggle').click(function() {
    const toothId = $(this).data('tooth');
    toggleImplant(toothId);
  });
  
  // Add handlers for mobility
  $('.mobility-input').change(function() {
    const toothId = $(this).data('tooth');
    updateMobility(toothId, $(this).val());
  });
  
  // Add handlers for furcation
  $('.furcation-toggle').click(function() {
    const toothId = $(this).data('tooth');
    toggleFurcation(toothId);
  });
}

function toggleImplant(toothId) {
  $(`#${toothId}-implant`).toggle();
  // Update visualization
  drawToothChart(toothId);
}

function updateMobility(toothId, value) {
  $(`#m${toothId}`).val(value);
  // Update visualization
  drawToothChart(toothId);
}

function toggleFurcation(toothId) {
  $(`#f${toothId}`).toggle();
  // Update visualization
  drawToothChart(toothId);
}