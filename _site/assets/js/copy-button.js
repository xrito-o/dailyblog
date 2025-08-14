document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('div.highlighter-rouge pre').forEach(pre => {
    if (pre.querySelector('.copy-btn')) return;
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.type = 'button';
    btn.innerHTML = `<span class="icon">📋</span><span class="text">Copy</span>`;
    btn.onclick = () => {
      const code = pre.querySelector('code');
      if (!code) return;
      const text = code.innerText;
      // Try Clipboard API, fallback to execCommand
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          btn.querySelector('.icon').textContent = '✅';
          btn.querySelector('.text').textContent = 'Copied!';
          btn.classList.add('copied');
          setTimeout(() => {
            btn.querySelector('.icon').textContent = '📋';
            btn.querySelector('.text').textContent = 'Copy';
            btn.classList.remove('copied');
          }, 1500);
        });
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          btn.querySelector('.icon').textContent = '✅';
          btn.querySelector('.text').textContent = 'Copied!';
          btn.classList.add('copied');
          setTimeout(() => {
            btn.querySelector('.icon').textContent = '📋';
            btn.querySelector('.text').textContent = 'Copy';
            btn.classList.remove('copied');
          }, 1500);
        } catch (err) {
          btn.querySelector('.icon').textContent = '❌';
          btn.querySelector('.text').textContent = 'Failed!';
        }
        document.body.removeChild(textarea);
      }
    };
    pre.appendChild(btn);
  });
});