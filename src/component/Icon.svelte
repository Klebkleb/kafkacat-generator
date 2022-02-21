<script context="module">
    export const directions = ["n", "ne", "e", "se", "s", "sw", "w", "nw"]
  </script>
  
  <script>
    export let name = "save"
    export let direction = "n"
  
    $: rotation = directions.indexOf(direction) * 45
  </script>

  <img 
    class="c"
    src="resources/icons/{name}.svg"
    alt={name}
    style="{`transform: rotate(${rotation}deg`}"/>
  
  <style>
    .c {
      width: 1em;
      height: 1em;
      fill: currentColor;
      transition: all 0.3s ease-out;
      overflow: visible;
    }
  </style>