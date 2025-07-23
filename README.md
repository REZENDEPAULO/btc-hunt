digraph G {
  rankdir=LR;
  node [shape=circle];

  1 -> 2;
  1 -> 3;
  3 -> central;
  5 -> central;
  central -> 4;
  central -> 5b;

  5b -> 3b;

  // Definindo nós extras
  central [label="+", shape=box];
  5b [label="5"];
  3b [label="3"];
}
