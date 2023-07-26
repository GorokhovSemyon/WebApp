from django.contrib import messages
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login
from django.contrib.auth import authenticate
from main.forms import LoginForm
from main.forms import RegistrationForm
from main.models import CustomUser, Order

def index(request):
    if request.user.is_authenticated:
        return render(request, 'main/index_lk.html')
    return render(request, 'main/index.html')

def devs(request):
    return render(request, 'main/devs.html')

def about(request):
    return render(request, 'main/about.html')

def appointments(request):
    return render(request, 'appointment/appointment.html')

def confirmation(request):
    name = request.POST['name']
    phone = request.POST['phone']
    email = request.POST['email']
    services = request.POST.get('services')
    master = request.POST.get('Master')
    date = request.POST.get('Date')
    time = request.POST.get('Time')
    element = Order(order_name=name, order_phone=phone, order_email=email,
                    services=services, Master=master, Date = date, Time=time)
    element.save()
    return render(request, 'appointment/confirmation.html')

def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            user = authenticate(request, email=email, password=password)
            if user is not None:
                login(request, user)
                return redirect('profile')  # Перенаправление на страницу профиля
            messages.error(request, 'Неверное имя пользователя или пароль.')
    form = LoginForm()
    return render(request, 'accounts/login.html', {'form': form})

@login_required
def profile(request):
    user = request.user  # Получаем текущего авторизованного пользователя
    orders = Order.objects.filter(order_email=user.email)  # Получаем записи пользователя по его email
    context = {
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'orders': orders  # Передаем записи в контекст
    }
    return render(request, 'accounts/profile.html', context)

def register(request):
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            first_name = form.cleaned_data['first_name']
            last_name = form.cleaned_data['last_name']
            email = form.cleaned_data['email']
            password1 = form.cleaned_data['password1']
            password2 = form.cleaned_data['password2']
            # Создание пользователя с помощью встроенной модели User
            user = CustomUser.objects.create_user(email=email, password=password1, username=email)
            user.first_name = first_name
            user.last_name = last_name
            user.save()
            return redirect('login')  # Перенаправление на страницу входа после успешной регистрации
        return render(request, 'accounts/register.html', {'form': form, 'errors': form.errors})
    form = RegistrationForm()
    return render(request, 'accounts/register.html', {'form': form})
