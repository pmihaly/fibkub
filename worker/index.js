const keys = require("./keys");
const redis = require("redis");

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000 // ha nem sikerült kapcsolódni a redishez, próbálkozzon 1 másodpercenként
});

const sub = redisClient.duplicate();

function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

/**
 * Ha érkezett egy üzenet (kiszámolandó index),
 * számolja ki a fibonacci sorozatot az indexig,
 * majd tárolja el (kulcs: index, érték: fibonacci-szám)
 */
sub.on("message", (channel, message) => {
  redisClient.hset("values", message, fib(parseInt(message)));
});

sub.subscribe("insert"); // figyelje a redisbe érkező aktivitásokat
