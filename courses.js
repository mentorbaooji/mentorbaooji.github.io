/* ==========================================================================
   COURSE READINESS ASSESSMENT
   Progressive enhancement for the 6-question Yes/No assessment on the
   Courses page. No framework, no build step — vanilla JS only, loaded as
   an external deferred script (no inline handlers).
   ========================================================================== */

(function () {
  var assessment = document.querySelector('[data-assessment]');
  if (!assessment) {
    return;
  }

  var questions = assessment.querySelectorAll('.assessment-question');
  var progressFill = assessment.querySelector('.assessment-progress-fill');
  var progressTrack = assessment.querySelector('.assessment-progress-track');
  var resultPanel = assessment.querySelector('.assessment-result');
  var scoreEl = assessment.querySelector('.assessment-score');
  var recommendationEl = assessment.querySelector('.assessment-recommendation');

  if (!progressFill || !resultPanel || !scoreEl || !recommendationEl) {
    return;
  }

  var total = questions.length;
  var answers = {};

  function updateProgress() {
    var answeredCount = Object.keys(answers).length;
    var percent = total > 0 ? Math.round((answeredCount / total) * 100) : 0;

    progressFill.style.width = percent + '%';

    if (progressTrack) {
      progressTrack.setAttribute('aria-valuenow', String(answeredCount));
    }

    if (answeredCount === total) {
      showResult();
    } else {
      resultPanel.hidden = true;
    }
  }

  function showResult() {
    var score = 0;

    Object.keys(answers).forEach(function (key) {
      if (answers[key] === 'yes') {
        score += 1;
      }
    });

    var recommendation;

    if (score >= 5) {
      recommendation =
        "You're ready. Group Learning is a strong fit for where you are right now — enrollment is the next step.";
    } else if (score >= 3) {
      recommendation =
        'You have real potential. Group Learning is still a good starting point — lean on WhatsApp Support early on as you get going.';
    } else {
      recommendation =
        "It's okay to not be fully ready yet. Start with the Free Resources library, build a little momentum, and come back when you are.";
    }

    scoreEl.textContent = score + ' / ' + total;
    recommendationEl.textContent = recommendation;
    resultPanel.hidden = false;
    resultPanel.setAttribute('tabindex', '-1');
    resultPanel.focus();
  }

  questions.forEach(function (question) {
    var key = question.getAttribute('data-question');
    var buttons = question.querySelectorAll('.assessment-answer-btn');

    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        buttons.forEach(function (b) {
          b.setAttribute('aria-pressed', 'false');
        });

        button.setAttribute('aria-pressed', 'true');
        answers[key] = button.getAttribute('data-value');
        updateProgress();
      });
    });
  });
})();
