<script>
    import {LayerCake, Svg} from "layercake";
</script>

<style>
    .container {
        width: 100%;
        height: 50px;
    }
</style>

<div class="container">
    <LayerCake>
        <Svg
          attrs={{id: 'example-visual', role: 'img', 'aria-labelledby': 'graphic-title'}}
        >
          <title id='graphic-title'>The graphic's label</title>
        </Svg>
    </LayerCake>
</div>
