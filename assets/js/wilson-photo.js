/** Wilson Antwi Amoako portrait — data-URI with sharpened display */
(function () {
  var img = document.getElementById('founder-photo-wilson');
  if (!img) return;
  var uri = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA8LDA0MCg8NDA0REA8SFyYZFxUVFy8iJBwmODE7OjcxNjU9RVhLPUFUQjU2TWlOVFteY2RjPEpsdGxgc1hhY1//2wBDARARERcUFy0ZGS1fPzY/X19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX1//wAARCAFAAPADASIAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAAAgMEBQYBAAf/xABAEAABBAECAwYDBQUHBAMBAAABAAIDEQQSIQUxQQYTIlFhcRQygSM0QpGxJDNSocEVJUNicoPRU3Ph8GOCkvH/xAAYAQADAQEAAAAAAAAAAAAAAAABAgMABP/EACMRAQEAAgIDAQACAwEAAAAAAAABAhEhMQMSQTITUSIzYXH/2gAMAwEAAhEDEQA/ALil6k2guUudZmdVcUeK3sqBn7TZJPkrItP9ruA5kqHxWMsyJw4c2Wra4RvZnZqQVICr5xFLPdmYnyOk7sErRnDyD+BUk4BFLt1zWFJ+ByP+mVDn/Z3aZRpJS8jND7wLokCSCwi0BmiCHI8JPeBcMgUWaUBgcxtpQyS4bN5
  img.decoding = 'async';
  img.loading = 'eager';
  img.style.imageRendering = 'auto';
  img.style.filter = 'contrast(1.16) saturate(1.1) brightness(1.03)';
  img.removeAttribute('srcset');
  img.removeAttribute('width');
  img.removeAttribute('height');
  img.src = uri;
})();
