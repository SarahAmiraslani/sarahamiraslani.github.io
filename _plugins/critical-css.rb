module Jekyll
  class CriticalCSS < Jekyll::Generator
    safe true
    priority :normal

    def generate(site)
      # Define critical CSS for above-the-fold content
      critical_css = <<~CSS
        /* Critical CSS for above-the-fold content */
        body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
        .navbar { background-color: #fff; box-shadow: 0 2px 4px rgba(0,0,0,.1); }
        .navbar-brand { font-weight: bold; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 15px; }
        .hero { padding: 4rem 0; text-align: center; }
        .hero h1 { font-size: 2.5rem; margin-bottom: 1rem; }
        .hero p { font-size: 1.2rem; color: #666; }
        .btn { display: inline-block; padding: 0.5rem 1rem; text-decoration: none; border-radius: 4px; }
        .btn-primary { background-color: #007bff; color: white; }
        .img-fluid { max-width: 100%; height: auto; }
        .text-center { text-align: center; }
        .d-none { display: none; }
        .d-block { display: block; }
        .d-flex { display: flex; }
        .justify-content-center { justify-content: center; }
        .align-items-center { align-items: center; }
        .w-100 { width: 100%; }
        .h-100 { height: 100%; }
        .position-relative { position: relative; }
        .position-absolute { position: absolute; }
        .top-0 { top: 0; }
        .left-0 { left: 0; }
        .right-0 { right: 0; }
        .bottom-0 { bottom: 0; }
        .m-0 { margin: 0; }
        .p-0 { padding: 0; }
        .mt-3 { margin-top: 1rem; }
        .mb-3 { margin-bottom: 1rem; }
        .pt-3 { padding-top: 1rem; }
        .pb-3 { padding-bottom: 1rem; }
      CSS

      # Add critical CSS to all pages
      site.pages.each do |page|
        if page.is_a?(Jekyll::Page) && page.ext == '.html'
          add_critical_css(page, critical_css)
        end
      end

      site.posts.docs.each do |post|
        add_critical_css(post, critical_css)
      end
    end

    private

    def add_critical_css(page, critical_css)
      return unless page.content.include?('<head>')

      # Add critical CSS inline
      critical_css_tag = "<style>#{critical_css}</style>"
      
      page.content = page.content.gsub(
        /<head>/,
        "<head>\n    #{critical_css_tag}"
      )
    end
  end
end 