document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const yearSelect = document.getElementById('year');
    const quarterSelect = document.getElementById('quarter');
    const checkPhaseBtn = document.getElementById('check-phase');
    const phaseDisplay = document.getElementById('phase-display');
    const phaseTitle = document.getElementById('phase-title');
    const phaseIcon = document.getElementById('phase-icon');
    const phaseDescription = document.getElementById('phase-description');
    const priceDirectionIcon = document.getElementById('price-direction-icon');
    const priceDirectionText = document.getElementById('price-direction-text');
    const volatilityIcon = document.getElementById('volatility-icon');
    const volatilityText = document.getElementById('volatility-text');
    const currentYearSpan = document.getElementById('current-year');

    // Set tahun saat ini di footer
    currentYearSpan.textContent = new Date().getFullYear();

    // Isi dropdown tahun dari 2020 hingga 2100
    for (let year = 2020; year <= 2100; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
    yearSelect.value = new Date().getFullYear(); // Set tahun default ke tahun ini

    // Data fase
    const phaseData = {
        bullrun: {
            title: 'Bull Run',
            description: 'Pasar mengalami apresiasi harga yang cepat. Optimisme investor tinggi dan FOMO (Fear Of Missing Out) muncul. Biasanya saat investor baru masuk ke pasar.',
            priceDirection: 'naik',
            volatility: 'tinggi',
            color: '#27ae60',
            icon: 'fas fa-chart-line'
        },
        bear: {
            title: 'Bear Market',
            description: 'Pasar dalam tren turun berkepanjangan. Pesimisme mendominasi saat harga terus turun. Banyak investor lemah menjual aset mereka selama fase ini.',
            priceDirection: 'turun',
            volatility: 'sedang',
            color: '#e74c3c',
            icon: 'fas fa-chart-line-down'
        },
        halving: {
            title: 'Fase Halving',
            description: 'Hadiah blok Bitcoin dipotong setengah, mengurangi pasokan baru yang masuk ke pasar. Secara historis, peristiwa ini mendahului bull run signifikan.',
            priceDirection: 'sideways',
            volatility: 'rendah',
            color: '#f1c40f',
            icon: 'fas fa-scissors'
        },
        accumulation: {
            title: 'Fase Akumulasi',
            description: 'Harga bergerak sideways saat smart money mengakumulasi Bitcoin dengan harga relatif rendah. Minat retail biasanya rendah selama fase ini.',
            priceDirection: 'sideways',
            volatility: 'rendah',
            color: '#3498db',
            icon: 'fas fa-coins'
        }
    };

    // Tentukan fase berdasarkan tahun dan kuartal
    function getPhase(year, quarter) {
        const yearNum = parseInt(year);
        const q = quarter;
        
        // Model siklus 4 tahun Bitcoin
        const cyclePosition = (yearNum - 2020) % 4;
        
        // Tahun Halving: 2020, 2024, 2028, ...
        if (yearNum % 4 === 0) {
            if (q === 'Q2' || q === 'Q3') return 'halving';
            if (q === 'Q4') return 'bullrun';
        }
        
        // Tahun setelah Halving (Bull Run utama)
        if (yearNum % 4 === 1) {
            if (q === 'Q1' || q === 'Q2' || q === 'Q3') return 'bullrun';
            if (q === 'Q4') return 'bear';
        }
        
        // Tahun kedua setelah Halving (Bear Market)
        if (yearNum % 4 === 2) {
            if (q === 'Q1') return 'bear';
            if (q === 'Q2' || q === 'Q3') return 'accumulation';
            if (q === 'Q4') return 'accumulation';
        }
        
        // Tahun ketiga setelah Halving (Akumulasi)
        if (yearNum % 4 === 3) {
            return 'accumulation';
        }
        
        // Default ke akumulasi
        return 'accumulation';
    }

    // Update tampilan dengan informasi fase
    function updatePhaseDisplay(phase) {
        const data = phaseData[phase];
        
        // Set info fase
        phaseTitle.textContent = data.title;
        phaseDescription.textContent = data.description;
        
        // Set ikon fase
        phaseIcon.innerHTML = `<i class="${data.icon}"></i>`;
        phaseIcon.style.backgroundColor = data.color;
        
        // Set arah harga
        if (data.priceDirection === 'naik') {
            priceDirectionIcon.innerHTML = '<i class="fas fa-arrow-up"></i>';
            priceDirectionText.textContent = 'Harga Naik';
        } else if (data.priceDirection === 'turun') {
            priceDirectionIcon.innerHTML = '<i class="fas fa-arrow-down"></i>';
            priceDirectionText.textContent = 'Harga Turun';
        } else {
            priceDirectionIcon.innerHTML = '<i class="fas fa-arrows-alt-h"></i>';
            priceDirectionText.textContent = 'Harga Sideways';
        }
        
        // Set volatilitas
        if (data.volatility === 'tinggi') {
            volatilityIcon.innerHTML = '<i class="fas fa-bolt"></i>';
            volatilityText.textContent = 'Volatilitas Tinggi';
        } else if (data.volatility === 'sedang') {
            volatilityIcon.innerHTML = '<i class="fas fa-wave-square"></i>';
            volatilityText.textContent = 'Volatilitas Sedang';
        } else {
            volatilityIcon.innerHTML = '<i class="fas fa-chart-area"></i>';
            volatilityText.textContent = 'Volatilitas Rendah';
        }
        
        // Tampilkan dengan animasi
        phaseDisplay.classList.add('show');
    }

    // Event listener untuk tombol cek fase
    checkPhaseBtn.addEventListener('click', function() {
        const year = yearSelect.value;
        const quarter = quarterSelect.value;
        const phase = getPhase(year, quarter);
        
        updatePhaseDisplay(phase);
    });

    // Inisialisasi dengan nilai default
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    let currentQuarter = 'Q1';
    if (currentMonth >= 3 && currentMonth <= 5) currentQuarter = 'Q2';
    else if (currentMonth >= 6 && currentMonth <= 8) currentQuarter = 'Q3';
    else if (currentMonth >= 9) currentQuarter = 'Q4';
    
    yearSelect.value = currentYear;
    quarterSelect.value = currentQuarter;
    updatePhaseDisplay(getPhase(currentYear, currentQuarter));
});