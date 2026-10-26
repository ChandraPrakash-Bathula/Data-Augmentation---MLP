# Data Augmentation and MLPs. From Data Foundations to Deep Learning.

**An Interactive Learning Resource for AA-5750: Contemporary Issues in Analytics.**

[**Launch the Interactive Website**](https://chandraprakash-bathula.github.io/Data-Augmentation---MLP/)

[**View the GitHub Repository**](https://github.com/ChandraPrakash-Bathula/Data-Augmentation---MLP)

## Overview.

**Data Augmentation and MLP** is an interactive educational project designed to help learners understand the foundations of modern deep learning, from data representation and augmentation to neural network architecture and training.

Developed for **AA-5750: Contemporary Issues in Analytics**, this resource connects mathematical concepts, implementation details, interactive demonstrations, and practical machine learning experiments.

The project follows a first-principles learning approach built around three questions.

- **What:** What is the operation, algorithm, or mathematical concept?
- **How:** How does it work, and how can it be implemented using NumPy, PyTorch, or related tools?
- **Why:** What problem does it solve, when is it useful, and when can it negatively affect model performance?

Rather than treating machine learning models as black boxes, the project explores how data is represented, transformed, augmented, processed by neural networks, and evaluated.

## Project Objectives.

- Understand how NumPy arrays and PyTorch tensors represent data.
- Explore text and image augmentation techniques.
- Understand the relationship between data augmentation, invariance, regularization, and generalization.
- Study the development of artificial neurons and multilayer neural networks.
- Compare perceptrons with logistic regression.
- Understand how multilayer perceptrons learn nonlinear representations.
- Explore the mathematical foundations of forward propagation and gradient-based learning.
- Investigate how dataset size and augmentation affect model training.
- Connect conceptual explanations with practical experiments and visualizations.

## Interactive Learning Experience.

**[Explore the Complete Website](https://chandraprakash-bathula.github.io/Data-Augmentation---MLP/)**

The website contains nine learning sections that progress from data fundamentals to an MLP assignment.

### Part I. Data Foundations and Augmentation.

#### 1. NumPy and PyTorch Tensors.

Explore the fundamental data structures used in machine learning.

Topics include:

- Arrays and tensors.
- Tensor shapes, dimensions, and data types.
- Indexing and slicing.
- Reshaping and broadcasting.
- Tensor arithmetic.
- Data preprocessing and preparation for model training.

#### 2. Text Augmentation.

Explore techniques for generating variations of text while attempting to preserve the original meaning and target label.

Topics include:

- Synonym replacement.
- Random word swapping.
- Random insertion and deletion.
- Typographical noise.
- Back-translation.
- Dataset-level augmentation.
- Semantic preservation and label consistency.

#### 3. Image Augmentation.

Investigate how image transformations create different training examples from existing images.

Topics include:

- Horizontal and vertical flips.
- Random rotations.
- Cropping and resizing.
- Color jitter.
- Noise and blur.
- Random erasing.
- Composing augmentation pipelines with torchvision.

#### 4. Why Data Augmentation Works.

Understand the principles behind augmentation and its impact on generalization.

Topics include:

- Overfitting and generalization.
- Data diversity and limited training samples.
- Invariance to transformations.
- Vicinal risk minimization.
- Augmentation as a form of regularization.
- Distribution shifts and label-preserving transformations.
- Situations in which augmentation can introduce harmful noise or change the target label.

### Part II. Deep Learning Foundations.

#### 5. A Brief History of Deep Learning.

Explore important developments that shaped modern neural networks.

Topics include:

- Early artificial neuron models.
- Rosenblatt's perceptron.
- Backpropagation and multilayer learning.
- The evolution of neural network research.
- The resurgence of deep learning and the ImageNet era.

#### 6. Biological and Artificial Neurons.

Understand how artificial neurons combine inputs and transform them into outputs.

Topics include:

- Biological neuron intuition.
- Weighted inputs and biases.
- Activation functions.
- Threshold-based behavior.
- The relationship between biological inspiration and mathematical abstraction.

#### 7. Perceptron vs. Logistic Regression.

Compare two models that share a weighted-sum foundation but use different output transformations.

Topics include:

- Linear decision boundaries.
- Perceptron learning.
- Logistic regression.
- Threshold-based classification.
- Sigmoid probabilities.
- Differences between perceptron updates and gradient-based optimization.

#### 8. From Perceptron to MLP.

Progress from a single artificial neuron to a multilayer neural network.

Topics include:

- Input, hidden, and output layers.
- Forward propagation.
- ReLU activation.
- Nonlinear representation learning.
- Parameter counting.
- Training and evaluation.
- The relationship between architecture, capacity, and learning behavior.

The interactive example includes an MLP architecture with the following layer widths.

`784 → 128 → 64 → 10`

This represents 784 input features, two hidden layers containing 128 and 64 neurons, and 10 output units for classification. With biases in each trainable layer, this architecture contains 109,386 trainable parameters.

#### 9. Assignment Guide.

Apply the concepts from the preceding sections through practical experiments involving MLP scaling and data augmentation.

The assignment explores two major questions.

- How does increasing the training dataset size from 5,000 to 50,000 samples affect MLP training and performance?
- How does data augmentation affect model generalization on CIFAR-10?

The guide covers experimental setup, training and test curves, visualizations, and reflection questions.

## Data Augmentation Fundamentals.

Data augmentation generates modified training examples from existing data. The objective is to expose a model to useful variations while preserving the information relevant to its prediction task.

For an original sample \(x\), an augmentation transformation \(T\) produces a modified sample:

$$
\tilde{x} = T(x)
$$

For supervised learning, the corresponding target should remain valid under the transformation:

$$
\tilde{y} = y
$$

This assumption is task-dependent. For example, a horizontal flip can preserve the class of many natural images, but transformations that change orientation-sensitive meaning may not preserve the label.

### Image Augmentation.

Image transformations can help a model learn features that remain useful under reasonable changes in appearance or viewpoint.

Examples include:

- Geometric transformations such as flipping, cropping, and rotation.
- Appearance transformations such as brightness, contrast, and color changes.
- Noise-based transformations such as blur and random noise.
- Occlusion-based transformations such as random erasing.

The choice of transformation should reflect the expected variability of the target application.

### Text Augmentation.

Text transformations require particular care because changing a word or its position can alter the meaning, sentiment, or class label of a sentence.

Useful augmentation strategies depend on the task, language, and semantic constraints of the dataset.

## Why Augmentation Can Improve Generalization.

A model trained on a small dataset may memorize training examples rather than learn features that generalize to unseen data.

Augmentation can expose the model to a broader set of plausible training examples and discourage reliance on irrelevant details.

For a model \(f_\theta\), a simplified empirical training objective with augmentation can be expressed as:

$$
\mathcal{L}(\theta) =
\frac{1}{N}\sum_{i=1}^{N}
\mathbb{E}_{T \sim \mathcal{A}}
\left[
\ell\left(f_\theta(T(x_i)),y_i\right)
\right]
$$

Here, \(N\) is the number of training examples, \(\mathcal{A}\) is the augmentation distribution, and \(\ell\) is the loss function.

In practice, the expectation is often approximated by sampling transformations during training.

Augmentation does not guarantee better performance. Its effectiveness depends on the dataset, task, model, and transformations used.

## Multilayer Perceptrons.

A multilayer perceptron combines affine transformations and nonlinear activation functions to learn mappings from input features to output predictions.

For layer \(l\), forward propagation is defined as:

$$
z^{(l)} = W^{(l)}a^{(l-1)} + b^{(l)}
$$

The activation is:

$$
a^{(l)} = \phi^{(l)}(z^{(l)})
$$

Here, \(W^{(l)}\) denotes the weight matrix, \(b^{(l)}\) denotes the bias vector, and \(\phi^{(l)}\) denotes the activation function.

A common hidden-layer activation is ReLU:

$$
\mathrm{ReLU}(x) = \max(0,x)
$$

During training, backpropagation calculates gradients of the loss with respect to trainable parameters. An optimizer then uses these gradients to update the weights and biases.

The interactive MLP lessons connect these mathematical operations to network architecture, parameter counting, and the training process.

## Practical Experiments.

The project emphasizes experimentation alongside conceptual learning.

| Experiment | Objective |
|---|---|
| Tensor operations | Understand how data is represented and transformed. |
| Text augmentation | Explore how textual transformations affect meaning and labels. |
| Image augmentation | Visualize image transformations and construct pipelines. |
| MLP scaling | Investigate the effects of training dataset size. |
| CIFAR-10 augmentation | Study the relationship between augmentation and generalization. |
| MLP fundamentals | Connect neural network architecture to forward computation and learning. |

For meaningful comparisons, evaluate models on a held-out test set that is not augmented with training transformations. Keep the evaluation procedure consistent across experimental conditions.

## Repository Structure.

The repository contains the interactive website, supporting assets, documentation, and individual topic pages.

```text
Data-Augmentation---MLP/
├── .github/
│   └── workflows/
├── assets/
│   ├── style.css
│   └── site.js
├── docs/
├── index.html
├── tensors.html
├── text-augmentation.html
├── image-augmentation.html
├── why-augmentation.html
├── deep-learning-history.html
├── neurons.html
├── perceptron-logreg.html
├── mlp.html
├── assignment.html
└── README.md
```

The exact contents of supporting directories may evolve as the project develops.

## Technologies.

The project uses web-based educational materials and interactive demonstrations, with concepts connected to the following machine learning tools and frameworks.

- **Python:** Practical machine learning experimentation.
- **NumPy:** Array operations and numerical computation.
- **PyTorch:** Tensor computation and neural network fundamentals.
- **torchvision:** Image datasets and augmentation transformations.
- **HTML, CSS, and JavaScript:** Interactive browser-based learning resources.
- **Jupyter Notebooks:** Companion exercises and experimental workflows.

See the repository files and companion notebooks for the exact implementation details of individual exercises.

## Learning Outcomes.

After working through the material, learners should be better prepared to:

- Represent and manipulate data using arrays and tensors.
- Choose augmentation techniques that fit a learning task.
- Explain why augmentation can improve generalization.
- Recognize when a transformation may invalidate a target label.
- Explain the mathematical behavior of an artificial neuron.
- Compare perceptron learning with logistic regression.
- Describe how multilayer perceptrons learn nonlinear functions.
- Understand the relationship between model capacity and parameter count.
- Design experiments that compare dataset sizes and augmentation strategies.
- Interpret training curves and evaluate models using held-out data.

## Future Directions.

Potential extensions to this learning resource include:

- Side-by-side comparisons of multiple augmentation strategies.
- Ablation studies for individual transformations and augmentation probabilities.
- Interactive visualizations of decision boundaries.
- Gradient-flow visualizations for multilayer networks.
- Comparisons between MLPs and convolutional neural networks.
- Experiments with automated augmentation policies.
- Reproducible comparisons across random seeds.
- Visualizations of the trade-offs between training performance and generalization.

## Author.

**Chandra Prakash Bathula.**

Adjunct Faculty, Saint Louis University.

- [GitHub](https://github.com/ChandraPrakash-Bathula).
- [LinkedIn](https://www.linkedin.com/in/chandra-prakash-bathula/).
- [Medium](https://medium.com/@ChandraPrakash-Bathula).

## Academic Use.

This resource is intended for educational purposes and practical exploration of data augmentation and neural network fundamentals.

Learners should critically evaluate experimental results, document their configurations, and distinguish observed performance improvements from assumptions about why a technique works.

## References.

- [PyTorch Documentation](https://pytorch.org/docs/stable/index.html).
- [torchvision Documentation](https://docs.pytorch.org/vision/stable/index.html).
- [NumPy Documentation](https://numpy.org/doc/).
- [Deep Learning Book by Ian Goodfellow, Yoshua Bengio, and Aaron Courville](https://www.deeplearningbook.org/).

---

**Data Augmentation and MLP.**

*From data foundations to neural network learning and generalization.*
