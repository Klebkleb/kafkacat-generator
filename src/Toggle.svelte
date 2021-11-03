<script lang="ts">
	export let round = true;
	export let toggled = false;
	export let label = "";
	export let disabled = false;
</script>

<!-- Rounded switch -->
<div class="switchDiv">
	<label class="checkBoxLabel" for="checkBox" class:disabled>{label}</label>
	<label class="switch">
		<input
			id="checkBox"
			type="checkbox"
			bind:checked={toggled}
			{disabled}
		/>
		<span class="slider" class:round />
	</label>
</div>

<style>
	.disabled {
		color: gray;
	}

	.checkBoxLabel {
		margin-right: 0.7em;
		min-width: 8em;
	}

	.switchDiv {
		display: inline-flex;
		align-items: center;
	}

	/* The switch - the box around the slider */
	.switch {
		position: relative;
		display: inline-block;
		width: 48px;
		height: 28px;
	}

	/* Hide default HTML checkbox */
	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	/* The slider */
	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ccc;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	.slider:before {
		position: absolute;
		content: "";
		height: 20px;
		width: 20px;
		left: 4px;
		bottom: 4px;
		background-color: white;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	input:checked + .slider {
		/* 		background-color: #2196F3; */
		background-color: black;
	}

	input:focus + .slider {
		box-shadow: 0 0 1px #2196f3;
	}

	input:disabled + .slider {
		background-color: #ccc;
	}

	input:checked + .slider:before {
		-webkit-transform: translateX(20px);
		-ms-transform: translateX(20px);
		transform: translateX(20px);
	}

	/* Rounded sliders */
	.slider.round {
		border-radius: 28px;
	}

	.slider.round:before {
		border-radius: 50%;
	}
</style>
