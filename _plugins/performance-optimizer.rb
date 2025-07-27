module Jekyll
  class PerformanceOptimizer < Jekyll::Generator
    safe true
    priority :high

    def generate(site)
      # Add preload links for critical resources
      site.pages.each do |page|
        if page.is_a?(Jekyll::Page) && page.ext == '.html'
          optimize_page(page, site)
        end
      end

      site.posts.docs.each do |post|
        optimize_page(post, site)
      end
    end

    private

    def optimize_page(page, site)
      return unless page.content.include?('<head>')

      # Add preload links for critical CSS
      critical_css = [
        '/assets/css/bootstrap.min.css',
        '/assets/css/main.css'
      ]

      preload_links = critical_css.map do |css|
        "<link rel=\"preload\" href=\"#{css}\" as=\"style\" onload=\"this.onload=null;this.rel='stylesheet'\">"
      end.join("\n    ")

      # Add preload for critical fonts
      font_preload = '<link rel="preload" href="/assets/webfonts/fa-solid-900.woff2" as="font" type="font/woff2" crossorigin>'

      # Add resource hints
      resource_hints = [
        '<link rel="dns-prefetch" href="//fonts.googleapis.com">',
        '<link rel="dns-prefetch" href="//cdnjs.cloudflare.com">',
        '<link rel="preconnect" href="https://fonts.googleapis.com">',
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
      ].join("\n    ")

      # Insert optimization tags after <head>
      optimized_head = page.content.gsub(
        /<head>/,
        "<head>\n    #{resource_hints}\n    #{font_preload}\n    #{preload_links}"
      )

      # Defer non-critical CSS
      optimized_content = optimized_head.gsub(
        /<link[^>]*\.css[^>]*>/,
        '<link rel="preload" href="\0" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">'
      )

      page.content = optimized_content
    end
  end
end 