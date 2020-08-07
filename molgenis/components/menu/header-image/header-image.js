export default {
    name: 'HeaderImage',
    props: {
        imgSrc: {
            type: String,
            required: true,
        },
        imgMaxHeight: {
            type: Number,
            required: true,
        },
    },
}