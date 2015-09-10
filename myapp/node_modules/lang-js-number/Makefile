default: index.min.js.gz

index.min.js.gz: index.min.js
	@gzip -9 < $< > $@

index.min.js: index.js
	@uglifyjs --screw-ie8 -mce < $< > $@

index.js: bin/export
	@$< > $@
