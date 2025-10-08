<template>
    <v-sheet border class="pa-4 rounded-xl border-md border-dashed" :height="files.length ? 'auto' : height" @dragover="dragover"
        @dragleave="dragleave" @drop="drop">
        <div class="d-flex justify-center align-center" :style="!files.length ? 'height: 100%' : ''">
            <input type="file" :multiple="multiple" name="file" id="fileInput" class="d-none" @change="onChange"
                ref="file" :accept="acceptedFormats" />

            <label for="fileInput" class="d-block cursor-pointer text-center"
                :class="{ 'border-green-500': isDragging }">
                <v-icon icon="mdi-camera-outline" size="50"></v-icon>
                <div v-if="isDragging" class="mb-2 text-caption grey-lighten-1">Release to drop files here.</div>
                <p class="mb-2 text-caption grey-lighten-1" v-if="!isDragging">
                    <span>Click
                        to upload</span> or drag and drop
                </p>
                <p v-if="!files.length" class="text-caption grey-lighten-1">svg, png, jpg, docx, xlsx, pdf</p>
            </label>
        </div>

        <div class="mt-4"
            :class="{ 'grid grid-cols-1': files.length === 1, 'd-flex justify-center items-center': files.length > 1 }"
            v-if="files.length">
            <div v-for="(file, index) in files" :key="index" class="d-block text-center p-1 m-1">
                <div class="">
                    <v-img :width="files.length === 1 ? '100%' : '50px'" :height="files.length === 1 ? '100%' : '50px'"
                        :src="generateURL(file)" :title="file.name"></v-img>

                    <!-- <div v-if="uploading" class="w-24 mx-auto mt-3" :class="{ 'w-64': files.length === 1 }">
                        <div class="bg-gray-200 h-2 rounded-lg overflow-hidden">
                            <div class="bg-green-500 h-full" :style="{ width: progress + '%' }"></div>
                        </div>
                        <div class="text-caption mt-1">{{ progress }}%</div>
                    </div> -->

                    <v-progress-linear v-if="uploading" striped :height="5" color="green" :model-value="progress"></v-progress-linear>

                    <p class="mt-2 text-caption font-weight-bold">
                        {{ makeName(file.name) }}
                    </p>
                    <p class="mt-2 text-caption font-weight-bold">
                        {{ formatFileSize(file.size) }}
                    </p>
                </div>
                <div>
                    <v-btn icon="mdi-trash-can" color="error" @click="removeFile(index)" variant="text"
                        size="small"></v-btn>
                </div>
            </div>
        </div>
    </v-sheet>

    <div v-if="previewImage && previewImage.length > 0" class="mt-4 d-flex items-center justify-center">
        <div v-for="(image, index) in previewImage" :key="index" class="even:mx-2">
            <img :src="image" class="w-24 h-24 object-cover mx-auto rounded bg-transparent" alt="Preview">
        </div>
    </div>

</template>

<script>
export default {
    props: {
        height: {
            type: String,
            default: '500px'
        },
        acceptedFormats: {
            type: String,
            default: ".pdf,.jpg,.jpeg,.png"
        },
        multiple: {
            type: Boolean,
            default: true
        },
        previewImage: {
            type: [Array, String],
            default: () => []
        }
    },
    emits: ['files-updated', 'update:previewImage'],
    data() {
        return {
            isDragging: false,
            files: [],
            progress: 0,
            uploading: false
        };
    },
    methods: {
        makeName(name) {
            return (
                name.split(".")[0].substring(0, 8) +
                "..." +
                name.split(".")[name.split(".").length - 1]
            );
        },
        onChange() {
            this.progress = 0;
            this.uploading = true;
            if (!this.multiple) {
                this.files = [];
            }
            this.files.push(...this.$refs.file.files);
            const interval = setInterval(() => {
                if (this.progress < 100) {
                    this.progress += 10;
                } else {
                    clearInterval(interval);
                    this.uploading = false;
                }
            }, 300);
            this.$emit('files-updated', this.files);
        },
        dragover(e) {
            e.preventDefault();
            this.isDragging = true;
        },
        dragleave() {
            this.isDragging = false;
        },
        drop(e) {
            e.preventDefault();
            this.$refs.file.files = e.dataTransfer.files;
            this.onChange();
            this.isDragging = false;
        },

        removeFile(i) {
            this.files.splice(i, 1);
            this.$emit('files-updated', this.files);
        },
        generateURL(file) {
            const fileSrc = URL.createObjectURL(file);
            this.$emit('update:previewImage', fileSrc);

            setTimeout(() => {
                URL.revokeObjectURL(fileSrc);
            }, 1000);

            return fileSrc;
        },

        formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';

            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));

            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }
    },
};
</script>

<style scoped>
.dropzone-icon {
    width: 50px;
    height: 50px;
    margin: 0 auto 24px;

}

.h-full {
    height: 100%;
}

.grid {
    display: grid;
}

.grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
}
</style>