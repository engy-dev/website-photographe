/**
 * Loop through focusable elements then focus on the first one.
 * @param {HTMLElement} element - The element to create the trap for.
 */
export default function FocusTrap(element) {
  // console.log(element);
  const focusableElements = element.querySelectorAll(
    'video, a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, h1, p, span'
  );

  // Loop focusable elements
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  /**
   * Handles the keydown event to trap focus within the element.
   * @param {KeyboardEvent} e - The keyboard event.
   */
  element.addEventListener('keydown', (e) => {
    const isTabPressed = (e.key === 'Tab' || e.keyCode === 9);
    if (!isTabPressed) return;

    /*
      * If shift is pressed + tabbing, focus the last focusable element. else, focus the first available one.
      */
    if (e.shiftKey){
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  });

}
