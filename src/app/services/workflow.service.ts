import { Injectable } from '@angular/core';
import { WorkflowList } from '../models/workflow-list.model';

@Injectable({
  providedIn: 'root' // сервіс доступний у всьому застосунку
})
export class WorkflowService {

  constructor() { }

  // Ключ, під яким у localStorage зберігається останній використаний ID
// readonly — значення не можна змінити після ініціалізації
// private — доступний лише всередині цього сервісу
private readonly ID_KEY = 'workflow_last_id';

/**
 * Генерує унікальний числовий ID
 * Працює для list / ticket / task
 * Кожен новий виклик повертає нове число
 */
generateId(): number {

  // Отримуємо останній збережений ID з localStorage
  // localStorage.getItem() повертає string або null
  // Number(...) перетворює значення у число
  // Якщо в localStorage ще нічого немає → беремо 0
  const lastId = Number(localStorage.getItem(this.ID_KEY)) || 0;

  // Створюємо новий ID, збільшуючи попередній на 1
  // Таким чином ID завжди унікальний
  const newId = lastId + 1;

  // Зберігаємо новий ID назад у localStorage
  // щоб наступний виклик починав саме з нього
  localStorage.setItem(this.ID_KEY, newId.toString());

  // Повертаємо новий унікальний ID
  return newId;
}

  /**
   * Зберігає масив WorkflowList у localStorage
   *  id ключ, під яким дані будуть збережені
   *  value масив списків workflow
   */
  setList(id: string, value: WorkflowList[]): void {
    try {
      // Перетворюємо об'єкт у JSON-рядок і зберігаємо в localStorage
      localStorage.setItem(id, JSON.stringify(value));
    } catch (error) {
      // Обробка помилки, якщо localStorage недоступний або переповнений
      console.error('Erro ao guardar no localStorage', error);
    }
  }

  /**
   * Отримує масив WorkflowList з localStorage
   * @param id ключ, за яким збережені дані
   * @returns масив WorkflowList або null, якщо дані відсутні
   */
  getList(id: string): WorkflowList[] | null {
    try {
      // Отримуємо рядок з localStorage
      const value = localStorage.getItem(id);

      // Якщо дані існують — парсимо JSON у об'єкт
      return value ? JSON.parse(value) : null;
    } catch (error) {
      // Обробка помилки парсингу JSON
      console.error('Erro ao ler de localStorage', error);
      return null;
    }
  }

  /**
   * Видаляє конкретний елемент з localStorage за ключем
   * @param id ключ елемента для видалення
   */
  removeList(id: string): void {
    localStorage.removeItem(id);
  }
  editList(updatedList: WorkflowList): void {

  // 1 Отримуємо всі workflow-списки з localStorage
  // Метод getList читає дані за ключем 'workflowLists'
  // і повертає масив WorkflowList або null
  const lists = this.getList('workflowLists');

  // 2 Перевіряємо, чи списки взагалі існують
  // Якщо localStorage порожній або ключа немає — виходимо з методу
  if (!lists) return;

  // 3 Шукаємо індекс списку, який потрібно відредагувати
  // findIndex проходить по всьому масиву
  // і повертає індекс елемента, в якого id співпадає з updatedList.id
  const index = lists.findIndex(l => l.Id === updatedList.Id);

  // 4 Якщо findIndex повернув -1,
  // це означає, що список з таким id не знайдено
  // у цьому випадку нічого не робимо і виходимо
  if (index === -1) return;

  // 5 Оновлюємо знайдений список
  // Створюємо новий обʼєкт замість прямої мутації
  lists[index] = {

    // Копіюємо всі старі властивості списку
    // (особливо tickets, щоб вони не загубилися)
    ...lists[index],

    //  Замінюємо лише ті поля, які дозволено редагувати
    name: updatedList.name,               // нова назва списку
    description: updatedList.description, // новий опис
    ProdutoId: updatedList.ProdutoId          // новий продукт
  };

  // 6 Зберігаємо оновлений масив списків назад у localStorage
  // setList перетворює масив у JSON і записує його в браузер
  this.setList('workflowLists', lists);
}



  /**
   * Повністю очищає localStorage
   * УВАГА: видаляє ВСІ дані, збережені в браузері для цього сайту
   */
  clear(): void {
    localStorage.clear();
  }
}
