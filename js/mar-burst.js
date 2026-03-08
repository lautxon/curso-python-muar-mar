/* Sistema MAR - Multi-Atención Recursiva */
const MarSystem = {
    queue: [],
    active: false,
    
    add: function(burst) {
        this.queue.push(burst);
        if (!this.active) this.process();
    },
    
    process: function() {
        if (this.queue.length === 0) {
            this.active = false;
            return;
        }
        
        this.active = true;
        const burst = this.queue.shift();
        triggerBurst(burst.id, burst.data);
    }
};