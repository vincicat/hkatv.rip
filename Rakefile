require 'bundler'
Bundler.require :default

require 'fileutils'
require 'json'
task :upload do
  AWS_BUCKET="isatvdead.reality.hk"
  AWS_REGION="ap-southeast-1"
  credentials = JSON.load(File.read('credentials.json'))

  Aws.config.update({
    region: AWS_REGION,
    credentials: Aws::Credentials.new(credentials['AccessKeyId'], credentials['SecretAccessKey']),
  })

  s3 = Aws::S3::Client.new
  Dir["./public/**/*.*"].each do |file|
    target = file.gsub("./public/", "")
    filename = File.basename(file)
    filetype = filename.split(".").last

    unless File.directory?(file)
      if filetype == "svg"
        puts "uploading svg " + target
        s3.put_object(acl: "public-read", body: open(file), bucket: AWS_BUCKET, key: target, content_type: "image/svg+xml")
      else
        puts "uploading " + target
        s3.put_object(acl: "public-read", body: open(file), bucket: AWS_BUCKET, key: target)
      end
    end
  end
end
