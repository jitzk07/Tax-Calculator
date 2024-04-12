const form = document.getElementById('taxForm');
    const modal = document.getElementById('modal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    function showModal(age, income, extraIncome, deductions, tax, finalIncome) {
        document.getElementById('modalAge').innerText = age;
        document.getElementById('modalIncome').innerText = income;
        document.getElementById('modalExtraIncome').innerText = extraIncome;
        document.getElementById('modalDeductions').innerText = deductions;
        document.getElementById('modalTax').innerText = tax;
        document.getElementById('modalFinalIncome').innerText = finalIncome;
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function showErrorIcon(element, message) {
        element.nextElementSibling.style.display = 'inline-block';
        element.nextElementSibling.nextElementSibling.innerText = message;
    }

    function hideErrorIcon(element) {
        element.nextElementSibling.style.display = 'none';
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const age = form.age.value;
        const income = parseFloat(form.income.value);
        const extraIncome = parseFloat(form.extraIncome.value);
        const deductions = parseFloat(form.deductions.value);

        let error = false;

        if (!age) {
            showErrorIcon(form.age, 'Age is mandatory!');
            error = true;
        } else {
            hideErrorIcon(form.age);
        }

        if (isNaN(income) || income < 0) {
            showErrorIcon(form.income, 'Enter a valid income!');
            error = true;
        } else {
            hideErrorIcon(form.income);
        }

        if (isNaN(extraIncome) || extraIncome < 0) {
            showErrorIcon(form.extraIncome, 'Enter a valid extra income amount!');
            error = true;
        } else {
            hideErrorIcon(form.extraIncome);
        }

        if (isNaN(deductions) || deductions < 0) {
            showErrorIcon(form.deductions, 'Enter a valid deduction amount!');
            error = true;
        } else {
            hideErrorIcon(form.deductions);
        }

        if (!error) {
            let totalIncome = income + extraIncome;
            let tax = 0;
            if (totalIncome > 800000) {
                if (age === '<40') {
                    tax = 0.3 * (totalIncome - 800000);
                } else if (age === '>=40 & <60') {
                    tax = 0.4 * (totalIncome - 800000);
                } else if (age === '>=60') {
                    tax = 0.1 * (totalIncome - 800000);
                }
            }
            let finalIncome = totalIncome - tax;
            showModal(age, income, extraIncome, deductions, tax.toFixed(2), finalIncome.toFixed(2));
        }
    });

    closeModalBtn.addEventListener('click', closeModal);