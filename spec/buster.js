var config = module.exports;

config["Browser Tests"] = {
    rootPath: "../",
    environment: "browser", 
    sources: [
        "js/square_seq.js"
    ],
    tests: [
        "spec/**/*_spec.js"
    ],
    
}