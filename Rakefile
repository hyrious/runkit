
desc "new notebook [title,\"deps1 deps2\"]"
task :new, [:title, :needs] do |t, args|
  mkdir_p args.title
  cd args.title
  sh "yarn init -s -y -p"
  sh "yarn add #{args.needs}" if args.needs
  touch "index.js"
  sh "subl index.js"
  cd ".."
  sh "yarn add #{args.needs}" if args.needs
end
