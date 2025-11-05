# frozen_string_literal: true

source "https://rubygems.org"

group :test do
  gem "html-proofer", "~> 5.1"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :windows, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:windows]

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions of the gem
# do not have a Java counterpart.
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]

group :jekyll_plugins do
  gem 'jekyll-archives'
  gem 'jekyll-email-protect'
  gem 'jekyll-feed'
  gem 'jekyll-imagemagick'
  gem 'jekyll-include-cache'
  gem 'jekyll-jupyter-notebook'
  gem 'jekyll-minifier'
  gem 'jekyll-paginate'
  gem 'jekyll-redirect-from'
  gem 'jekyll-scholar'
  gem 'jekyll-sitemap'
end
