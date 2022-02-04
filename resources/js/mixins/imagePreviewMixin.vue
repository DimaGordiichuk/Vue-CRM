<script>
export default {
    data() {
        return {
            imagePreviewURL: null,
            file: null,
        }
    },
    methods: {
        onFileChange(payload) {
            this.file = payload.target.files[0];
            // use it in case of normal HTML input
            // const file = payload; // in case vuetify file input
            if (this.file) {
                this.imagePreviewURL = URL.createObjectURL(this.file);
                URL.revokeObjectURL(this.file); // free memory
            } else {
                this.imagePreviewURL =  null
            }
        }
    },
}
</script>
