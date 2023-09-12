<script lang="ts">
  import clsx from 'clsx';

  let className: undefined | string = undefined;
  export { className as class };

  let date = new Date();
  let portugal = new Date(new Date().toLocaleString('en', { timeZone: 'Europe/Lisbon' }));

  setInterval(() => {
    date = new Date();
    portugal = new Date(portugal.getTime() + 1000);
  }, 1000);

  $: secondsAngle = (portugal.getSeconds() * 360) / 60;
  $: minutesAngle = (portugal.getMinutes() * 360) / 60;
  $: hoursAngle = ((portugal.getHours() % 12) * 360) / 12 + minutesAngle / 12;

  $: isWithinWorkingHours = portugal.getHours() >= 9 && portugal.getHours() < 18;
  $: isWorkingDay = portugal.getDay() >= 1 && portugal.getDay() <= 5;

  /**
   * Work hours go from 9am to 6pm.
   * This totals 270 degrees but it goes from 270 -> 360 -> 0 -> 90 -> 180 -> 270.
   *
   * if hoursAngle is between 0 and 180 (12pm to 6pm), the total perimeter available is 0.5 (12pm to 6pm OR 180 degrees).
   * between 180 and 270, we shouldn't render anything.
   * if hoursAngle is greater than 270 (9am to 12pm), the total perimeter available is 0.75 (9am to 6pm OR 270 degrees).
   */
  function getRemainingWorkingHoursPerimeter(hoursAngle: number) {
    if (hoursAngle >= 270) {
      return 0.75 - (hoursAngle - 270) / 360;
    } else {
      return 0.5 - hoursAngle / 360;
    }
  }
  let remainingWorkingHoursPerimeter: number | null = null;

  $: if (isWithinWorkingHours && isWorkingDay) {
    remainingWorkingHoursPerimeter = getRemainingWorkingHoursPerimeter(hoursAngle);
  } else {
    remainingWorkingHoursPerimeter = null;
  }
</script>

<svelte:window
  on:focus={() =>
    (portugal = new Date(new Date().toLocaleString('en', { timeZone: 'Europe/Lisbon' })))}
/>

<div class={clsx('relative', className)}>
  <div
    class="absolute bottom-[13%] left-1/2 hidden -translate-x-1/2 text-center text-xs xl:block 2xl:text-sm"
  >
    <p class="text-foreground-secondary">
      {Intl.DateTimeFormat().resolvedOptions().timeZone.replace('_', ' ')}
    </p>
    <p class="tabular-nums">
      {date.getHours().toString().padStart(2, '0')}:{date
        .getMinutes()
        .toString()
        .padStart(2, '0')}:{date.getSeconds().toString().padStart(2, '0')}
    </p>
  </div>
  <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 564 564">
    <path
      d="M282 522v14M282 28v14M522 282h14M28 282h14M489.848 162l12.124-7M62.031 409l12.125-7M402 74.154l7-12.124M155 501.971l7-12.125M162 74.154l-7-12.124M409 501.971l-7-12.125M74.152 162l-12.124-7M501.969 409l-12.125-7M308.234 531.623l.314 2.984M255.449 29.39l.314 2.984M429.535 485.062l1.764 2.428M132.703 76.51l1.763 2.427M511.301 384.092l2.74 1.22M49.96 178.689l2.742 1.221M531.629 255.766l2.983-.314M29.395 308.553l2.983-.314M485.07 134.469l2.427-1.764M76.516 431.301l2.426-1.764M384.098 52.703l1.22-2.74M178.695 514.043l1.221-2.741M334.188 527.516l.623 2.934M229.191 33.55l.624 2.935M449.953 468.529l2.008 2.23M112.043 93.242l2.007 2.23M520.719 359.562l2.853.928M40.434 203.51l2.853.927M527.516 229.814l2.934-.623M33.55 334.811l2.935-.624M468.531 114.049l2.23-2.008M93.242 451.961l2.23-2.007M359.566 43.289l.927-2.853M203.512 523.572l.927-2.853M359.566 520.715l.927 2.853M203.512 40.432l.927 2.853M468.531 449.953l2.23 2.007M93.242 112.041l2.23 2.007M527.516 334.186l2.934.623M33.55 229.191l2.935.624M520.719 204.438l2.853-.928M40.434 360.492l2.853-.927M449.953 95.475l2.008-2.23M112.043 470.762l2.007-2.23M334.191 36.488l.624-2.934M229.195 530.453l.624-2.934M384.094 511.301l1.22 2.74M178.691 49.959l1.221 2.74M485.066 429.533l2.427 1.764M76.512 132.701l2.427 1.764M531.629 308.236l2.983.314M29.395 255.449l2.983.314M511.301 179.908l2.74-1.22M49.96 385.311l2.742-1.221M429.535 78.936l1.764-2.428M132.703 487.49l1.763-2.427M308.234 32.377l.314-2.984M255.449 534.611l.314-2.983"
      stroke="hsl(var(--color-foreground))"
      stroke-width="3"
      stroke-linecap="round"
    />
    <path
      fill="hsl(var(--color-foreground-tertiary))"
      d="M281 73h2v209h-2V73Z"
      transform="rotate({secondsAngle} 282 282)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M280.001 282h4v-30.223a9.002 9.002 0 0 0 6.999-8.776v-106a9 9 0 0 0-9-9 9 9 0 0 0-9 9v106a9.003 9.003 0 0 0 7.001 8.777V282ZM283 243.001a1 1 0 0 1-2 0v-106a1 1 0 1 1 2 0v106Z"
      fill="hsl(var(--color-foreground-secondary))"
      transform="rotate({minutesAngle} 282 282)"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M284.001 282h-4v-30.224a9.002 9.002 0 0 1-7.001-8.777v-72a9 9 0 0 1 18 0v72c0 4.283-2.992 7.867-6.999 8.777V282ZM282 243.999a1 1 0 0 0 1-1v-72a1 1 0 0 0-2 0v72a1 1 0 0 0 1 1Z"
      fill="hsl(var(--color-foreground))"
      transform="rotate({hoursAngle} 282 282)"
    />
    <circle cx="282" cy="282" r="6" fill="hsl(var(--color-foreground))" />
    <g transform="rotate(-90 282 282)">
      <circle
        cx="282"
        cy="282"
        r="274"
        stroke="hsl(var(--color-border))"
        stroke-width="16"
        stroke-dasharray="{2 * 274 * Math.PI * 0.75} {2 * 274 * Math.PI}"
        transform="rotate(-90 282 282)"
        stroke-linecap="round"
      />
      {#if remainingWorkingHoursPerimeter}
        <circle
          cx="282"
          cy="282"
          r="274"
          stroke="hsl(var(--color-brand))"
          stroke-width="16"
          stroke-linecap="round"
          stroke-dasharray="{2 * 274 * Math.PI * remainingWorkingHoursPerimeter} {2 *
            274 *
            Math.PI}"
          transform="rotate({hoursAngle} 282 282)"
        />
      {/if}
    </g>
  </svg>
</div>
