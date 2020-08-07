export default {
    name: 'HeaderImage',
    props: {
        imgMaxHeight: {
            required: true,
            type: Number,
        },
        imgSrc: {
            required: true,
            type: String,
        },
    },
}