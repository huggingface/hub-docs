# Displaying carbon emissions for your model

## Why is it beneficial to calculate the carbon emissions of my model?

Training ML models is often energy-intensive and can produce a substantial carbon footprint, as described by [Strubell et al.](https://arxiv.org/abs/1906.02243). It's therefore important to *track* and *report* the emissions of models to get a better idea of the environmental impacts of our field.


## What information should I include about the carbon footprint of my model?

If you can, you should include information about:
- where the model was trained (in terms of location)
- the hardware used -- e.g. GPU, TPU, or CPU, and how many
- training type: pre-training or fine-tuning
- the estimated carbon footprint of the model, calculated in real-time with the [Code Carbon](https://github.com/mlco2/codecarbon) package or after training using the [ML CO2 Calculator](https://mlco2.github.io/impact/).

## Carbon footprint metadata

You can add the carbon footprint data to the model card metadata (in the README.md file). The structure of the metadata should be:

```yaml
---
co2_eq_emissions:
  emissions: number (in grams of CO2)
  source: "source of the information, either directly from AutoTrain, code carbon or from a scientific article documenting the model"
  training_type: "pre-training or fine-tuning"
  geographical_location: "as granular as possible, for instance Quebec, Canada or Brooklyn, NY, USA. To check your compute's electricity grid, you can check out https://app.electricitymap.org."
  hardware_used: "how much compute and what kind, e.g. 8 v100 GPUs"
---
```

## How is the carbon footprint of my model calculated? 🌎

Considering the computing hardware, location, usage, and training time, you can estimate how much CO<sub>2</sub> the model produced.

The math is pretty simple! ➕

First, you take the *carbon intensity* of the electric grid used for the training -- this is how much CO<sub>2</sub> is produced by KwH of electricity used. The carbon intensity depends on the location of the hardware and the [energy mix](https://electricitymap.org/) used at that location -- whether it's renewable energy like solar 🌞, wind 🌬️ and hydro 💧, or non-renewable energy like coal ⚫ and natural gas 💨. The more renewable energy gets used for training, the less carbon-intensive it is!
 
Then, you take the power consumption of the GPU during training using the `pynvml` library.

Finally, you multiply the power consumption and carbon intensity by the training time of the model, and you have an estimate of the CO<sub>2</sub> emission.

Keep in mind that this isn't an exact number because other factors come into play -- like the energy used for data center heating and cooling -- which will increase carbon emissions. But this will give you a good idea of the scale of CO<sub>2</sub> emissions that your model is producing!

To add **Carbon Emissions** metadata to your models:

1. If you are using **AutoTrain**, this is tracked for you 🔥
2. Otherwise, use a tracker like  Code Carbon in your training code, then specify
```yaml
co2_eq_emissions: 
  emissions: 1.2345
```
in your model card metadata, where `1.2345` is the emissions value in **grams**. 

To learn more about the carbon footprint of Transformers, check out the [video](https://www.youtube.com/watch?v=ftWlj4FBHTg), part of the Hugging Face Course!
