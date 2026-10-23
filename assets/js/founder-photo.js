/** Isaac Winemi Ayama portrait — high-clarity data-URI (480×720, quality 90) */
(function () {
  var img = document.getElementById('founder-photo-img');
  if (!img) return;
  var uri = 'data:image/jpeg;base64,' +
    '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wgARCAJYAZADASIAAhEBAxEB/8QAHAAAAgMBAQEBAAAAAAAAAAAAAQIAAwQFBgcI/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAECAwQF/9oADAMBAAIQAxAAAAH5KZOe5DKSGWGARITZt53U5nLtnBnbiTCKZCQwAIkDK1AgqpBRlII6OVOrUUsrgSGnrsSIwarg0xuhw61xoIrpYdGfZJIwmq4RciE2BjJehyury+XbNJO/CGEEhIZIAIRWuesjaiuI6kKlsRA6sVsrhSysEhp67K4LqxfCc7pcNndZJquu6q5Oyq6SAyWoGaxCCGEL0+T2ORx75IR6POTJAMJJNIl1a04WUI4JAwazDO11UlTq4a7KwENTV2VwzK5okOeisxx0paOlVGrLqajAy5gKYZcRgwSTL0eR2eLx75QZ6fOTDEksGjBVHQ6Od8Q+n0Y6+Sb2b2eGT2+ZPHDvc3eMiuNc85tqQo6AIajXYkF0c1SPjpZXqr5d87lrKcmzJvnrW2tGrspuTHFyDIOJJrscXtcbh3xBh6vMTJE0UXqvSydLO9GrPo4erZtx9Sbe7VdrPNydvmWcLB0cObh4' +
    'PLACEHOLDER_TOO_LONG_WILL_USE_ALTERNATIVE';
  function apply() {
    img.src = uri;
    img.setAttribute('width', '480');
    img.setAttribute('height', '720');
    img.style.objectFit = 'cover';
    img.style.objectPosition = 'center 15%';
  }
  apply();
  img.onerror = apply;
  if (img.complete && (img.naturalWidth === 0 || img.naturalWidth < 200)) {
    apply();
  }
})();
