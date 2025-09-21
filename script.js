 // Expandable cards functionality
 document.querySelectorAll('.expandable-card .card-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
        const card = trigger.parentElement;
        card.classList.toggle('active');
        
        const icon = trigger.querySelector('i');
        if (card.classList.contains('active')) {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        } else {
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        }
    });
});

// Quiz functionality
document.querySelectorAll('.quiz-option').forEach(option => {
    option.addEventListener('click', () => {
        // Remove selected class from siblings in the same question
        const siblings = option.parentElement.children;
        for (let sibling of siblings) {
            sibling.classList.remove('selected');
        }
        
        // Add selected class to clicked option
        option.classList.add('selected');
    });
});

// Submit quiz functionality
document.getElementById('submit-quiz').addEventListener('click', () => {
    let score = 0;
    const questions = document.querySelectorAll('.quiz-question');
    
    questions.forEach(question => {
        const selectedOption = question.querySelector('.quiz-option.selected');
        
        if (selectedOption) {
            const isCorrect = selectedOption.getAttribute('data-correct') === 'true';
            
            if (isCorrect) {
                score++;
                selectedOption.classList.add('correct');
            } else {
                selectedOption.classList.add('incorrect');
                
                // Highlight the correct answer
                const correctOption = question.querySelector('.quiz-option[data-correct="true"]');
                correctOption.classList.add('correct');
            }
        } else {
            // If no option selected, show correct answer
            const correctOption = question.querySelector('.quiz-option[data-correct="true"]');
            correctOption.classList.add('correct');
        }
    });
    
    // Display results
    document.getElementById('score').textContent = score;
    
    // Provide feedback based on score
    const feedback = document.getElementById('quiz-feedback');
    if (score === 5) {
        feedback.textContent = 'Perfect! You have excellent knowledge about family planning.';
    } else if (score >= 3) {
        feedback.textContent = 'Good job! You know quite a bit about family planning.';
    } else {
        feedback.textContent = 'Keep learning! Review the myths and facts section to improve your knowledge.';
    }
    
    document.querySelector('.quiz-results').classList.add('show');
    
    // Scroll to results
    document.querySelector('.quiz-results').scrollIntoView({ behavior: 'smooth' });
});

// Retry quiz functionality
document.getElementById('retry-quiz').addEventListener('click', () => {
    // Reset all selections
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.classList.remove('selected', 'correct', 'incorrect');
    });
    
    // Hide results
    document.querySelector('.quiz-results').classList.remove('show');
    
    // Scroll to top of quiz
    document.getElementById('quiz').scrollIntoView({ behavior: 'smooth' });
});