let currentStep = 1;
let selectedSubscription = null;

const subscriptionData = {
    free: {
        title: 'Spotify Free',
        price: 'Grátis',
        warning: 'Você já está usando o plano gratuito. Não há assinatura para cancelar.'
    },
    individual: {
        title: 'Premium Individual',
        price: 'R$ 21,90/mês',
        warning: 'Ao cancelar sua assinatura Premium Individual, você perderá acesso a todos os recursos Premium imediatamente. Suas playlists offline serão removidas e você voltará a ouvir anúncios.'
    },
    duo: {
        title: 'Premium Duo',
        price: 'R$ 27,90/mês',
        warning: 'Ao cancelar sua assinatura Premium Duo, ambas as contas perderão acesso aos recursos Premium imediatamente. Todas as playlists offline serão removidas.'
    },
    family: {
        title: 'Premium Família',
        price: 'R$ 34,90/mês',
        warning: 'Ao cancelar sua assinatura Premium Família, todas as 6 contas perderão acesso aos recursos Premium imediatamente. O controle parental e playlists offline serão removidos.'
    },
    student: {
        title: 'Premium Universitário',
        price: 'R$ 11,90/mês',
        warning: 'Ao cancelar sua assinatura Premium Universitário, você perderá acesso a todos os recursos Premium imediatamente. Suas playlists offline serão removidas.'
    }
};

function updateProgress() {
    const progress = (currentStep / 5) * 100;
    const progressFill = document.querySelector('.progress-fill');
    const currentStepElement = document.getElementById('current-step');
    const progressPercent = document.getElementById('progress-percent');
    
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
    if (currentStepElement) {
        currentStepElement.textContent = currentStep;
    }
    if (progressPercent) {
        progressPercent.textContent = progress;
    }
}

function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.step').forEach(s => s.style.display = 'none');
    
    // Show current step
    document.getElementById(`step-${step}`).style.display = 'block';
    
    currentStep = step;
    updateProgress();
}

function nextStep() {
    if (currentStep < 5) {
        showStep(currentStep + 1);
    }
}

function previousStep() {
    if (currentStep > 1) {
        showStep(currentStep - 1);
    }
}

// Login form validation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the app
    showStep(1);
    
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (!email || !password) {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            
            if (!email.includes('@')) {
                alert('Por favor, insira um email válido.');
                return;
            }
            
            // Simulate loading
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Verificando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                nextStep();
            }, 2000);
        });
    }

    // Subscription selection form
    const subscriptionForm = document.getElementById('subscription-form');
    if (subscriptionForm) {
        subscriptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const selectedOption = document.querySelector('input[name="subscription"]:checked');
            
            if (!selectedOption) {
                alert('Por favor, selecione uma assinatura.');
                return;
            }
            
            selectedSubscription = selectedOption.value;
            
            // Special handling for free plan
            if (selectedSubscription === 'free') {
                alert('Você já está usando o plano gratuito. Não há assinatura para cancelar.');
                return;
            }
            
            nextStep();
        });
    }

    // Handle subscription selection change
    document.querySelectorAll('input[name="subscription"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const selectedValue = this.value;
            const infoDiv = document.getElementById('selected-subscription-info');
            const warningText = document.getElementById('warning-text');
            
            if (selectedValue && subscriptionData[selectedValue]) {
                warningText.textContent = subscriptionData[selectedValue].warning;
                infoDiv.style.display = 'block';
            } else {
                infoDiv.style.display = 'none';
            }
        });
    });

    // Cancel reason form
    const reasonForm = document.getElementById('reason-form');
    if (reasonForm) {
        reasonForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const selectedReason = document.querySelector('input[name="reason"]:checked');
            
            if (!selectedReason) {
                alert('Por favor, selecione um motivo para o cancelamento.');
                return;
            }
            
            nextStep();
        });
    }

    // Payment form validation and submission
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const cardName = document.getElementById('card-name').value;
            const cardNumber = document.getElementById('card-number').value;
            const cardExpiry = document.getElementById('card-expiry').value;
            const cardCvv = document.getElementById('card-cvv').value;
            
            if (!cardName || !cardNumber || !cardExpiry || !cardCvv) {
                alert('Por favor, preencha todos os campos do cartão.');
                return;
            }
            
            if (cardNumber.replace(/\s/g, '').length < 16) {
                alert('Número do cartão deve ter pelo menos 16 dígitos.');
                return;
            }
            
            if (cardCvv.length < 3) {
                alert('CVV deve ter pelo menos 3 dígitos.');
                return;
            }
            
            // Validate expiry date
            const [month, year] = cardExpiry.split('/');
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear() % 100;
            const currentMonth = currentDate.getMonth() + 1;
            
            if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
                alert('Cartão vencido. Por favor, verifique a data de validade.');
                return;
            }
            
            // Simulate payment processing
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Processando pagamento...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                nextStep();
            }, 3000);
        });
    }

    // Card number formatting
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }

    // Card expiry formatting
    const cardExpiryInput = document.getElementById('card-expiry');
    if (cardExpiryInput) {
        cardExpiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }

    // CVV formatting (numbers only)
    const cardCvvInput = document.getElementById('card-cvv');
    if (cardCvvInput) {
        cardCvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    }
});

