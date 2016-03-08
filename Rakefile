require 'bundler'
Bundler.require :default

require 'fileutils'
require 'mime-types'
require 'json'
task :upload do
  AWS_BUCKET="hkatv.rip"
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
    mimetype = MIME::Types.type_for(file).first.simplified

    unless File.directory?(file)
      puts "Uploading " + target
      s3.put_object(acl: "public-read", body: open(file), bucket: AWS_BUCKET, key: target, content_type: mimetype)
    end
  end
end
